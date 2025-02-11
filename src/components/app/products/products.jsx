import React, { useContext } from "react";
import { useProducts, useProductCategories } from "../../../hooks/useProducts";
import { useParams, useNavigate } from 'react-router-dom'
import { Smartphone, ArrowLeft } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CartContext } from "./cart-provider";
import { QuantityControl } from "../quantity-control";
import { ProductCard } from "../product-card";

export const Products = () => {
    const { productCategoryId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { data: categories, isLoading: isCategoriesLoading } = useProductCategories();

    const categoryFromCache = categories?.find(
        category => category.productCategoryId === productCategoryId
    );

    const { data, isLoading, error } = useProducts(productCategoryId);
    if(isLoading || isCategoriesLoading){
        return <h1>Still loading...</h1>
    }
    if(error){
        return <h1>error is returned</h1>
    }

    return (
        <div className="container mx-auto px-4">
          { categoryFromCache.productCategoryName }
          <div className="mb-6 mt-4">
            <button 
              onClick={() => navigate('/products')} 
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Categories
            </button>
            
            <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
              <Smartphone className="h-4 w-4 text-primary"/>
              <h1 className="text-2xl font-bold">{categoryFromCache.productCategoryName}</h1>
            </div>
          </div>
    
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((product) => (
                <ProductCard 
                key={product.productId}
                product={product}
                />
            ))}
          </div>
    
          {data.length === 0 && (
            <div className="text-center py-8 text-gray-600">
              No products found in this category.
            </div>
          )}
        </div>
      );
}

export default Products;