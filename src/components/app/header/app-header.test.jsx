import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Header } from './app-header';
import { CartContext } from '../cart/cart-provider';

vi.mock('../../../theme/mode-toggle', () => ({
  ModeToggle: () => <div data-testid="mode-toggle" />
}));

vi.mock('lucide-react', () => ({
  ShoppingCart: () => <div data-testid="shopping-cart-icon" />
}));

vi.mock('../cart/cart-window', () => ({
  CartWindow: ({ isOpen, onClose, cartItems, addToCart, removeFromCart }) => (
    isOpen ? (
      <div data-testid="cart-window" data-is-open={isOpen}>
        <button data-testid="close-button" onClick={() => onClose(false)}>Close</button>
        <div data-testid="cart-items">{JSON.stringify(cartItems)}</div>
      </div>
    ) : null
  )
}));

vi.mock('../../common/button', () => ({
  Button: ({ children, variant, size }) => (
    <button data-testid="button" data-variant={variant} data-size={size}>
      {children}
    </button>
  )
}));

describe('Header', () => {
  const mockCartContext = {
    cartItems: {
      'item1': { id: 'item1', name: 'Product 1', price: 10, quantity: 2 }
    },
    cartCount: 2,
    addToCart: vi.fn(),
    removeFromCart: vi.fn(),
    getProductQuantity: vi.fn()
  };

  const mockEmptyCartContext = {
    cartItems: {},
    cartCount: 0,
    addToCart: vi.fn(),
    removeFromCart: vi.fn(),
    getProductQuantity: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders header with logo and navigation links', () => {
    render(
      <CartContext.Provider value={mockEmptyCartContext}>
        <Header />
      </CartContext.Provider>
    );

    expect(screen.getByAltText('Logo')).toBeDefined();
    expect(screen.getByText('Brand')).toBeDefined();
    expect(screen.getByText('Home')).toBeDefined();
    expect(screen.getByText('About')).toBeDefined();
    expect(screen.getByText('Products')).toBeDefined();
    expect(screen.getByText('Contact')).toBeDefined();
  });

  it('renders buttons and theme toggle', () => {
    render(
      <CartContext.Provider value={mockEmptyCartContext}>
        <Header />
      </CartContext.Provider>
    );

    expect(screen.getByText('Sign In')).toBeDefined();
    expect(screen.getByText('Get Started')).toBeDefined();
    expect(screen.getByTestId('mode-toggle')).toBeDefined();
    expect(screen.getByTestId('shopping-cart-icon')).toBeDefined();
  });

  it('displays cart count badge when items in cart', () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <Header />
      </CartContext.Provider>
    );

    expect(screen.getByText('2')).toBeDefined();
  });

  it('does not display cart count badge when cart is empty', () => {
    render(
      <CartContext.Provider value={mockEmptyCartContext}>
        <Header />
      </CartContext.Provider>
    );

    expect(screen.queryByText('0')).toBeNull();
  });

  it('opens cart window when cart icon is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <CartContext.Provider value={mockCartContext}>
        <Header />
      </CartContext.Provider>
    );

    await user.click(screen.getByTestId('shopping-cart-icon').parentElement);
    
    expect(screen.getByTestId('cart-window')).toBeDefined();
    expect(screen.getByTestId('cart-window').dataset.isOpen).toBe('true');
  });

  it('closes cart window when close is triggered', async () => {
    const user = userEvent.setup();
    
    render(
      <CartContext.Provider value={mockCartContext}>
        <Header />
      </CartContext.Provider>
    );

    await user.click(screen.getByTestId('shopping-cart-icon').parentElement);
    expect(screen.getByTestId('cart-window')).toBeDefined();
    
    await user.click(screen.getByTestId('close-button'));
    expect(screen.queryByTestId('cart-window')).toBeNull();
  });

  it('passes correct props to CartWindow', async () => {
    const user = userEvent.setup();
    
    render(
      <CartContext.Provider value={mockCartContext}>
        <Header />
      </CartContext.Provider>
    );

    await user.click(screen.getByTestId('shopping-cart-icon').parentElement);
    
    const cartItemsData = JSON.parse(screen.getByTestId('cart-items').textContent);
    expect(cartItemsData).toEqual(mockCartContext.cartItems);
  });
});