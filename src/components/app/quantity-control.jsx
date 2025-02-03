import React, { useContext, useState, memo, useCallback } from "react";
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react";
import { CartContext } from "./cart-provider";

export const QuantityControl = memo(({ product }) => {
    const { addToCart, removeFromCart, getProductQuantity } = useContext(CartContext);
    const [isAdded, setIsAdded] = useState(false);
    
    const quantity = getProductQuantity(product.productId);
  
    const handleIncrement = useCallback(() => {
        addToCart(product.productId, {
            name: product.productName,
            price: product.price
        });
        setIsAdded(true);
    }, [product.productId, product.productName, product.price, addToCart]);
  
    const handleDecrement = useCallback(() => {
        removeFromCart(product.productId);
        if (quantity === 1) {
            setIsAdded(false);
        }
    }, [product.productId, removeFromCart, quantity]);

    const handleInitialAdd = useCallback(() => {
        setIsAdded(true);
        addToCart(product.productId, {
            name: product.productName,
            price: product.price
        });
    }, [product.productId, product.productName, product.price, addToCart]);
  
    if (!isAdded && quantity === 0) {
        return (
            <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleInitialAdd}
            >
                Add to Cart
            </Button>
        );
    }
  
    return (
        <div className="flex items-center justify-center gap-2">
            <Button 
                variant="outline" 
                size="icon"
                onClick={handleDecrement}
                disabled={quantity === 0}
                className="h-8 w-8"
            >
                <Minus className="h-4 w-4" />
            </Button>
            
            <span className="w-8 text-center font-medium">
                {quantity}
            </span>
            
            <Button 
                variant="outline" 
                size="icon"
                onClick={handleIncrement}
                className="h-8 w-8"
            >
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    );
});

QuantityControl.displayName = 'QuantityControl';

export default QuantityControl;