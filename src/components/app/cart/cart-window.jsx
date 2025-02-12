import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

export const CartWindow = ({ isOpen, onClose, cartItems, removeFromCart, addToCart }) => {
  const calculateTotal = () => {
    return Object.entries(cartItems).reduce((total, [ , item]) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  console.log(cartItems);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Shopping Cart</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh]">
          {Object.entries(cartItems).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-500">
              Your cart is empty
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(cartItems).map(([productId, item]) => (
                <div 
                  key={productId} 
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeFromCart(productId)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => addToCart(productId)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {Object.entries(cartItems).length > 0 && (
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total</span>
              <span className="font-bold">${calculateTotal().toFixed(2)}</span>
            </div>
            <Button className="w-full">
              Proceed to Checkout
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartWindow;