import { toast as toastFunction } from "@/components/ui/toast"

export const toast = toastFunction
export const useToast = () => {
  return {
    toast: toastFunction
  }
} 