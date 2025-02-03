import { useQuery } from '@tanstack/react-query'
import { fetchproductCategories, fetchProductsForCategory } from '../api/products'

export const useProductCategories = () => {
  return useQuery({
    queryKey: ['productCategories'],
    queryFn: fetchproductCategories,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 *1000
  })
}

export function useCategory(categoryId) {
    const { data: categories } = useProductCategories()    
    return useQuery({
      queryKey: ['category', categoryId],
      queryFn: async () => {
        const existingCategory = categories?.find(
          category => category.productCategoryId === categoryId
        )
        return existingCategory;
      },
      initialData: () => 
        categories?.find(
          category => category.productCategoryId === categoryId
        )
    })
}

export const useProducts = (categoryId) => {
    return useQuery({
        queryKey: ["products", categoryId],
        queryFn: () => fetchProductsForCategory(categoryId),
        enabled: !!categoryId
    })
}