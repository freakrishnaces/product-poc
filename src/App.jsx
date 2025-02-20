import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Header } from "@/app/header/app-header";
import { ThemeProvider } from "@/common/theme-provider";
import { RecentActivity } from "@/app/home/recent-activity";
import { ProductCategories} from "@/app/products/product-categories";
import { Products } from "@/app/products/products";
import { CartProvider } from '@/app/cart/cart-provider';
import { lazy } from "react";

const RemoteApp = lazy(
  async () => import('remote/remote-app'),
);

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider storageKey="vite-ui-theme" defaultTheme="dark">
        <CartProvider>
          <Header />
          <BrowserRouter>
            <Routes>
              <Route path='/' element={ <RecentActivity />}/>
              <Route path="/products" element={<ProductCategories />} />
              <Route path='/products/:productCategoryId' element={ <Products/> }/>
              <Route path='/about' element = { <RemoteApp /> }/>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
