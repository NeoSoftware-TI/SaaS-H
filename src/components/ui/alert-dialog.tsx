"use client"

import * as React from "react"
import { Button } from "@/src/components/ui/button"
import { cn } from "@/src/lib/utils"

// Implementação personalizada do AlertDialog sem depender do Radix UI
interface AlertDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

// Modifique a implementação do AlertDialog para garantir que ele só seja renderizado quando estiver aberto
const AlertDialog: React.FC<AlertDialogProps> = ({ open, onOpenChange, children }) => {
  // Se não estiver aberto, não renderize nada
  if (open === false) {
    return null
  }
  return <>{children}</>
}

const AlertDialogTrigger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>
}

const AlertDialogPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
}

const AlertDialogOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  ),
)
AlertDialogOverlay.displayName = "AlertDialogOverlay"

// Modifique o AlertDialogContent para ter um fundo branco
const AlertDialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <AlertDialogOverlay />
      <div
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className,
        )}
        {...props}
      />
    </div>
  ),
)
AlertDialogContent.displayName = "AlertDialogContent"

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <h2 ref={ref} className={cn("text-lg font-semibold", className)} {...props} />,
)
AlertDialogTitle.displayName = "AlertDialogTitle"

const AlertDialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
AlertDialogDescription.displayName = "AlertDialogDescription"

const AlertDialogAction = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, onClick, ...props }, ref) => (
    <Button
      ref={ref}
      className={cn(className)}
      onClick={(e) => {
        if (onClick) {
          onClick(e)
        }
      }}
      {...props}
    />
  ),
)
AlertDialogAction.displayName = "AlertDialogAction"

// Modifique o AlertDialogCancel para garantir que o onClick funcione corretamente
const AlertDialogCancel = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { onCancel?: () => void }
>(({ className, onClick, onCancel, ...props }, ref) => (
  <Button
    ref={ref}
    variant="outline"
    className={cn("mt-2 sm:mt-0", className)}
    onClick={(e) => {
      // Garantir que o evento onClick seja chamado
      if (onClick) {
        onClick(e)
      }
      // Chamar onCancel se fornecido
      if (onCancel) {
        onCancel()
      }
    }}
    {...props}
  />
))
AlertDialogCancel.displayName = "AlertDialogCancel"

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}

