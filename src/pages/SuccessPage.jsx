import { useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../hooks/useCart"
import { useToast } from "../hooks/useToast"

function SuccessPage() {
  const user = localStorage.getItem("smartcartUser")
  const navigate = useNavigate()
  const { clearCart } = useCart()
  const { success } = useToast()
  const hasHandledSuccess = useRef(false)

  useEffect(() => {
    if (!user) {
      navigate("/")
      return
    }

    if (hasHandledSuccess.current) {
      return
    }

    hasHandledSuccess.current = true
    clearCart()
    success("Your order has been confirmed! ✅")
  }, [user, navigate, clearCart, success])

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-2xl">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
          ✅
        </div>

        <h1 className="text-3xl font-bold text-slate-900">
          Order Placed Successfully
        </h1>

        <p className="mt-4 text-slate-600">
          Thank you for ordering with SmartCart. Your food is being prepared and will be delivered soon.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/menu"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Menu
          </Link>

          <button
            onClick={() => navigate("/cart")}
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage