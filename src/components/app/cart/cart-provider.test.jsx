import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useContext } from 'react';
import { CartProvider, CartContext } from './cart-provider';
import '@testing-library/jest-dom';

global.fetch = vi.fn();

const TestComponent = () => {
  const { cartItems, cartCount, addToCart, removeFromCart, getProductQuantity } = useContext(CartContext);
  
  return (
    <div>
      <div data-testid="cart-count">{cartCount}</div>
      <div data-testid="product-1-quantity">{getProductQuantity('product-1')}</div>
      <button data-testid="add-product-1" onClick={() => addToCart('product-1', { name: 'Product 1', price: 10 })}>
        Add Product 1
      </button>
      <button data-testid="remove-product-1" onClick={() => removeFromCart('product-1')}>
        Remove Product 1
      </button>
      <pre data-testid="cart-items">{JSON.stringify(cartItems)}</pre>
    </div>
  );
};

describe('CartProvider', () => {
  beforeEach(() => {
    global.fetch.mockReset();
    
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true })
    });
  });

  it('renders children correctly', () => {
    render(
      <CartProvider>
        <div data-testid="child">Test Child</div>
      </CartProvider>
    );
    
    expect(screen.getByTestId('child')).toHaveTextContent('Test Child');
  });

  it('initializes with empty cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-items')).toHaveTextContent('{}');
  });

  it('adds item to cart', async () => {
    const user = userEvent.setup();
    
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    
    await user.click(screen.getByTestId('add-product-1'));
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByTestId('product-1-quantity')).toHaveTextContent('1');
    
    expect(global.fetch).toHaveBeenCalledWith('/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: 'product-1',
        quantity: 1,
        productDetails: { name: 'Product 1', price: 10 }
      }),
    });
  });

  it('adds multiple items to cart', async () => {
    const user = userEvent.setup();
    
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    await user.click(screen.getByTestId('add-product-1'));
    await user.click(screen.getByTestId('add-product-1'));
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    expect(screen.getByTestId('product-1-quantity')).toHaveTextContent('2');
    
    const cartItems = JSON.parse(screen.getByTestId('cart-items').textContent);
    expect(cartItems['product-1'].quantity).toBe(2);
    expect(cartItems['product-1'].name).toBe('Product 1');
    expect(cartItems['product-1'].price).toBe(10);
  });

  it('removes item from cart', async () => {
    const user = userEvent.setup();
    
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    await user.click(screen.getByTestId('add-product-1'));
    await user.click(screen.getByTestId('add-product-1'));
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    
    await user.click(screen.getByTestId('remove-product-1'));
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByTestId('product-1-quantity')).toHaveTextContent('1');
    
    expect(global.fetch).toHaveBeenCalledWith('/api/cart/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: 'product-1',
        quantity: 1
      }),
    });
  });

  it('removes item completely when quantity reaches zero', async () => {
    const user = userEvent.setup();
    
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    await user.click(screen.getByTestId('add-product-1'));
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    
    await user.click(screen.getByTestId('remove-product-1'));
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('product-1-quantity')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-items')).toHaveTextContent('{}');
  });

  it('handles API errors gracefully when adding items', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Server error' })
    });
    
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const user = userEvent.setup();
    
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    await user.click(screen.getByTestId('add-product-1'));
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });

  it('handles API errors gracefully when removing items', async () => {
    const user = userEvent.setup();
    
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    await user.click(screen.getByTestId('add-product-1'));
    
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Server error' })
    });
    
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    await user.click(screen.getByTestId('remove-product-1'));
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });

  it('getProductQuantity returns correct quantity', async () => {
    const user = userEvent.setup();
    
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    expect(screen.getByTestId('product-1-quantity')).toHaveTextContent('0');
    
    await user.click(screen.getByTestId('add-product-1'));
    await user.click(screen.getByTestId('add-product-1'));
    
    expect(screen.getByTestId('product-1-quantity')).toHaveTextContent('2');
    
    await user.click(screen.getByTestId('remove-product-1'));
    
    expect(screen.getByTestId('product-1-quantity')).toHaveTextContent('1');
  });
});