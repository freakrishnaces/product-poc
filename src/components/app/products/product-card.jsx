import React, { memo } from "react";
import { QuantityControl } from "./quantity-control";

export const ProductCard = memo(({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.productName}</h3>
        <div className="space-y-2">
          <p className="text-gray-600">Stock: {product.stockQuantity}</p>
          <p className="text-lg font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <div className="mt-4 flex justify-center">
          <QuantityControl product={product} />
        </div>
      </div>       
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;