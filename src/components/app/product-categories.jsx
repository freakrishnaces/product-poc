import React from "react";
import { useProductCategories } from "../../hooks/useProducts";
import { 
    Smartphone, 
    Laptop, 
    Headphones, 
    Camera, 
    Watch, 
    Tv, 
    Speaker, 
    Gamepad,
    Loader2
  } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProductCategories = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useProductCategories();
    const icons = [Smartphone, Laptop, Headphones, Camera, Watch, Tv, Speaker, Gamepad];

    if(isLoading){
        return <h1>Still loading...</h1>
    }
    if(error){
        return <h1>error is returned</h1>
    }

    return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-8 text-center">Product Categories</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((category) => {
              const RandomIcon = icons[Math.floor(Math.random() * icons.length)];
              
              return (
                <div 
                  key={category.productCategoryId}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => navigate(`/products/${category.productCategoryId}`)}
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <RandomIcon className="w-8 h-8 text-blue-600" />
                    </div>
                    
                    <div className="text-center">
                      <h3 className="font-semibold text-lg mb-1">{category.productCategoryName}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    );
}

export default ProductCategories;