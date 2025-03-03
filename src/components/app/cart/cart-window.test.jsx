import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { CartWindow } from './cart-window';

vi.mock('../../common/dialog', () => ({
  Dialog: ({ children, open }) => open ? <div data-testid="dialog">{children}</div> : null,
  DialogContent: ({ children, className }) => <div data-testid="dialog-content" className={className}>{children}</div>,
  DialogHeader: ({ children }) => <div data-testid="dialog-header">{children}</div>,
  DialogTitle: ({ children }) => <div data-testid="dialog-title">{children}</div>
}));

vi.mock('../../common/scroll-area', () => ({
  ScrollArea: ({ children, className }) => <div data-testid="scroll-area" className={className}>{children}</div>
}));

vi.mock('../../common/button', () => ({
  Button: ({ children, variant, size, className, onClick }) => 
    <button 
      data-testid="button" 
      data-variant={variant} 
      data-size={size} 
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
}));

vi.mock('lucide-react', () => ({
  Plus: () => <div data-testid="plus-icon" />,
  Minus: () => <div data-testid="minus-icon" />
}));

describe('CartWindow', () => {
  const mockCartItems = {
    'item1': { id: 'item1', name: 'Product 1', price: 10, quantity: 2 },
    'item2': { id: 'item2', name: 'Product 2', price: 15, quantity: 1 }
  };
  
  const mockEmptyCart = {};
  
  const mockProps = {
    isOpen: true,
    onClose: vi.fn(),
    cartItems: mockCartItems,
    removeFromCart: vi.fn(),
    addToCart: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders when isOpen is true', () => {
    render(<CartWindow {...mockProps} />);
    expect(screen.getByTestId('dialog')).toBeDefined();
  });

  it('does not render when isOpen is false', () => {
    render(<CartWindow {...mockProps} isOpen={false} />);
    expect(screen.queryByTestId('dialog')).toBeNull();
  });

  it('shows empty cart message when cart is empty', () => {
    render(<CartWindow {...mockProps} cartItems={mockEmptyCart} />);
    expect(screen.getByText('Your cart is empty')).toBeDefined();
  });

  it('displays correct items from cart', () => {
    render(<CartWindow {...mockProps} />);
    expect(screen.getByText('Product 1')).toBeDefined();
    expect(screen.getByText('Product 2')).toBeDefined();
    expect(screen.getByText('$10.00 × 2')).toBeDefined();
    expect(screen.getByText('$15.00 × 1')).toBeDefined();
  });

  it('displays correct quantity for each item', () => {
    render(<CartWindow {...mockProps} />);
    
    const quantityContainers = screen.getAllByTestId('button')
      .filter(button => button.innerHTML.includes('plus-icon') || button.innerHTML.includes('minus-icon'))
      .map(button => button.parentElement);
      
    const quantitySpans = quantityContainers.map(container => 
      Array.from(container.children).find(child => 
        child.tagName.toLowerCase() === 'span'
      )
    );
    
    expect(quantitySpans.length).toBe(4);
    
    const quantities = quantitySpans.map(span => span.textContent);
    expect(quantities).toContain('2');
    expect(quantities).toContain('1');
  });

  it('calculates and displays the correct total', () => {
    render(<CartWindow {...mockProps} />);
    expect(screen.getByText('$35.00')).toBeDefined();
  });

  it('calls addToCart when plus button is clicked', async () => {
    const user = userEvent.setup();
    render(<CartWindow {...mockProps} />);
    
    const plusButtons = screen.getAllByTestId('button').filter(
      button => button.innerHTML.includes('plus-icon')
    );
    
    await user.click(plusButtons[0]);
    expect(mockProps.addToCart).toHaveBeenCalledTimes(1);
  });

  it('calls removeFromCart when minus button is clicked', async () => {
    const user = userEvent.setup();
    render(<CartWindow {...mockProps} />);
    
    const minusButtons = screen.getAllByTestId('button').filter(
      button => button.innerHTML.includes('minus-icon')
    );
    
    await user.click(minusButtons[0]);
    expect(mockProps.removeFromCart).toHaveBeenCalledTimes(1);
  });

  it('does not show checkout section when cart is empty', () => {
    render(<CartWindow {...mockProps} cartItems={mockEmptyCart} />);
    expect(screen.queryByText('Total')).toBeNull();
    expect(screen.queryByText('Proceed to Checkout')).toBeNull();
  });

  it('shows checkout section when cart has items', () => {
    render(<CartWindow {...mockProps} />);
    expect(screen.getByText('Total')).toBeDefined();
    expect(screen.getByText('Proceed to Checkout')).toBeDefined();
  });
});