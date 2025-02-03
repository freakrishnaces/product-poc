export const fetchproductCategories = async() => {
    const response = await fetch('http://localhost:5087/productCategories');
    if (!response.ok) {
        throw new Error('Failed to fetch products')
    }
    return response.json();
}

export const fetchProductsForCategory = async(categoryId) => {
    const response = await fetch(`http://localhost:5087/products?categoryId=${categoryId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch products')
    }
    return response.json();
}

export const updateProductsInCart = async(product) => {
    
}