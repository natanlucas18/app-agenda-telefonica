import { toast } from "sonner"

const baseStyle =
  "border border-neutral-200 bg-white text-gray-900 shadow-md rounded-md"

export const appToast = {
  success(message: string) {
    toast.success(message, {
      className: baseStyle,
      style: {
        borderLeft: "4px solid #7e22ce",
      },
    })
  },

  error(message: string) {
    toast.error(message, {
      className: baseStyle,
      style: {
        borderLeft: "4px solid #dc2626",
      },
    })
  },

  info(message: string) {
    toast(message, {
      className: baseStyle,
      style: {
        borderLeft: "4px solid #6b7280",
      },
    })
  },
}
