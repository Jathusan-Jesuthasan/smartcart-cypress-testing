import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "../hooks/useToast"

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { error: showError, success } = useToast()

  useEffect(() => {
    const user = localStorage.getItem("smartcartUser")
    if (user) {
      navigate("/menu")
    }
  }, [navigate])

  const handleLogin = (e) => {
    e.preventDefault()

    if (!email && !password) {
      showError("Email and password are required")
      setError("Email and password are required")
      return
    }

    if (!email) {
      showError("Email is required")
      setError("Email is required")
      return
    }

    if (!password) {
      showError("Password is required")
      setError("Password is required")
      return
    }

    if (
      email === "jesuthasanjathusan@gmail.com" &&
      password === "Jathu1234@"
    ) {
      localStorage.setItem("smartcartUser", email)
      setError("")
      success("Login successful! Welcome back!")
      setTimeout(() => {
        navigate("/menu")
      }, 500)
    } else {
      showError("Invalid email or password")
      setError("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-blue-600 text-white text-xl font-bold mb-4">
            S
          </div>
          <h1 className="text-3xl font-bold text-slate-900">SmartCart</h1>
          <p className="text-slate-500 mt-2">Sign in to continue your food ordering experience</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <p
              id="error-message"
              className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-medium text-red-600"
            >
              {error}
            </p>
          )}

          <button
            id="login-button"
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
          >
            Login
          </button>
        </form>

        <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-700 mb-1">Demo Credentials</p>
          <p>Email: jesuthasanjathusan@gmail.com</p>
          <p>Password: Jathu1234@</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage