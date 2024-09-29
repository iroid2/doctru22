"use client"

 
import {
  
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Toast
} from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast";
 

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            {/* Use title, action, etc. inside the Toast component as needed */}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
