import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import { ToastProvider } from "./context/ToastContext"
import Toast from "./components/Toast"
import LoginPage from "./pages/LoginPage"
import MenuPage from "./pages/MenuPage"
import CartPage from "./pages/CartPage"
import SuccessPage from "./pages/SuccessPage"

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <BrowserRouter>
          <Toast />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ToastProvider>
  )
}

export default App