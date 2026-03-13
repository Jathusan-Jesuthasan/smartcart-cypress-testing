import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../hooks/useCart"
import { useToast } from "../hooks/useToast"

function CartPage() {
  const navigate = useNavigate()
  const { cartItems, removeFromCart, increaseQty, decreaseQty, cartTotal, cartCount } = useCart()
  const { success, info } = useToast()

  const handleRemove = (itemName) => {
    removeFromCart(itemName)
    success(`${itemName} removed from cart`)
  }

  const handleIncreaseQty = (itemName) => {
    increaseQty(itemName)
    info("Quantity increased")
  }

  const handleDecreaseQty = (itemName) => {
    decreaseQty(itemName)
    info("Quantity decreased")
  }

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      success("Processing your order...")
      setTimeout(() => {
        navigate("/success")
      }, 500)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Your Cart</h1>
            <p className="mt-2 text-slate-500">
              Review your selected items before checkout.
            </p>
          </div>

          <Link
            to="/menu"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Back to Menu
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800">Your cart is empty</h2>
            <p className="mt-3 text-slate-500">
              Add some delicious items from the menu to get started.
            </p>
            <Link
              to="/menu"
              className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-28 w-full rounded-2xl object-cover md:w-32"
                  />

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{item.category}</p>
                    <p className="mt-2 text-slate-700">Unit Price: LKR {item.price}</p>
                    <p className="mt-1 font-semibold text-blue-600">
                      Subtotal: LKR {item.price * item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDecreaseQty(item.id)}
                      className="h-10 w-10 rounded-full bg-slate-200 text-lg font-bold text-slate-700 transition hover:bg-slate-300"
                    >
                      -
                    </button>
                    <span className="min-w-6 text-center text-lg font-semibold text-slate-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncreaseQty(item.id)}
                      className="h-10 w-10 rounded-full bg-slate-200 text-lg font-bold text-slate-700 transition hover:bg-slate-300"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemove(item.name)}
                    className="rounded-xl bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">Order Summary</h2>

              <div className="mt-6 space-y-3 text-slate-700">
                <div className="flex items-center justify-between">
                  <span>Total Items</span>
                  <span className="font-semibold">{cartCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold">LKR 0</span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-lg font-bold text-slate-900">
                  <span>Total</span>
                  <span id="cart-total">LKR {cartTotal}</span>
                </div>
              </div>

              <button
                id="checkout-button"
                onClick={handleCheckout}
                className="mt-6 w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage