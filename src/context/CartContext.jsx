import { useEffect, useMemo, useState, useCallback } from "react"
import { CartContext } from "../hooks/useCart"

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("smartcartCart")
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem("smartcartCart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = useCallback((product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prevItems, { ...product, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }, [])

  const increaseQty = useCallback((id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }, [])

  const decreaseQty = useCallback((id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  )

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  )

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    cartCount,
    cartTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}