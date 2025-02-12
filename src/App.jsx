import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Header } from "@/components/app/app-header";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { RecentActivity } from "@/components/app/recent-activity";
import { ProductCategories} from "@/components/app/product-categories";
import { Products } from "@/components/app/products";
import { CartProvider } from '@/components/app/cart-provider';

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
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
