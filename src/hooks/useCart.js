import { useContext, createContext } from "react"

const CartContext = createContext()

export { CartContext }

export function useCart() {
  return useContext(CartContext)
}
