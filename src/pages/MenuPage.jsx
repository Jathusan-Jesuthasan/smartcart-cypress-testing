import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import products from "../data/products"
import { useCart } from "../hooks/useCart"
import { useToast } from "../hooks/useToast"

function MenuPage() {
  const navigate = useNavigate()
  const user = localStorage.getItem("smartcartUser")
  const { addToCart, cartCount } = useCart()
  const { success } = useToast()

  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [user, navigate])

  const handleLogout = () => {
    localStorage.removeItem("smartcartUser")
    navigate("/")
  }

  const handleAddToCart = (product) => {
    addToCart(product)
    success(`${product.name} added to cart!`)
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">SmartCart</h1>
            <p className="text-sm text-slate-500">Food Ordering Portal</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              id="cart-button"
              className="rounded-xl bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700"
            >
              Cart ({cartCount})
            </Link>

            <button
              id="logout-button"
              onClick={handleLogout}
              className="rounded-xl bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h2 id="welcome-text" className="text-2xl font-semibold text-slate-800">
            Welcome back, {user}
          </h2>
          <p className="mt-2 text-slate-500">
            Explore today’s menu and add your favorite meals to the cart.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-52 w-full object-cover"
              />

              <div className="p-6">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                      {product.category}
                    </span>
                    <h3 className="mt-3 text-xl font-bold text-slate-900">
                      {product.name}
                    </h3>
                  </div>

                  <span className="text-lg font-bold text-blue-600">
                    LKR {product.price}
                  </span>
                </div>

                <p className="mb-5 text-sm leading-6 text-slate-600">
                  {product.description}
                </p>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default MenuPage