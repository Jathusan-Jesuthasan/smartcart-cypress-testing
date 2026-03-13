import { useContext } from "react"
import { ToastContext } from "../context/ToastContext"

function Toast() {
  const { toasts, removeToast } = useContext(ToastContext)

  const getStyles = (type) => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-800",
          icon: "✓",
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
        }
      case "error":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-800",
          icon: "✕",
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
        }
      case "warning":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          text: "text-yellow-800",
          icon: "⚠",
          iconBg: "bg-yellow-100",
          iconColor: "text-yellow-600",
        }
      case "info":
      default:
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-800",
          icon: "ℹ",
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
        }
    }
  }

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-3 max-w-sm">
      {toasts.map((toast) => {
        const styles = getStyles(toast.type)
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto animate-in slide-in-from-right-4 fade-in rounded-xl border ${styles.bg} ${styles.border} p-4 shadow-lg transition-all duration-300 ease-out`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${styles.iconBg} ${styles.iconColor} font-bold text-sm`}
              >
                {styles.icon}
              </div>
              <div className="flex-1 pt-0.5">
                <p className={`font-medium ${styles.text}`}>{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className={`shrink-0 p-0.5 transition hover:opacity-70 ${styles.text}`}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Toast
