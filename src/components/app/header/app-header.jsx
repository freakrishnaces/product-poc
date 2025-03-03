import React, { useState, useContext } from 'react'
import { Button } from "../../common/button"
import { ModeToggle } from "../../../theme/mode-toggle"
import { ShoppingCart } from 'lucide-react'
import { CartContext } from '../cart/cart-provider'
import { CartWindow } from '../cart/cart-window'


export const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, cartCount, addToCart, removeFromCart } = useContext(CartContext);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <a href="/" className="flex items-center space-x-2">
            <img 
              src="/sample.png" 
              alt="Logo" 
              className="h-8 w-8"
            />
            <span className="inline-block font-bold">Brand</span>
          </a>
          
          <nav className="flex gap-6">
            <a href="/" className="flex items-center text-sm font-medium">
              Home
            </a>
            <a href="/about" className="flex items-center text-sm font-medium">
              About
            </a>
            <a href="/products" className="flex items-center text-sm font-medium">
              Products
            </a>
            <a href="#" className="flex items-center text-sm font-medium">
              Contact
            </a>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button variant="default" size="sm">
              Sign In
            </Button>
            <Button size="sm">
              Get Started
            </Button>
            <ModeToggle />
            <div className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </div>
          </nav>
        </div>
      </div>
      <CartWindow 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    </header>
  )
}

export default Header