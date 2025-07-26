// lib/use-toast.ts
'use client'

import { toast as sonnerToast } from 'sonner'
import type { ReactNode } from "react";

type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info'

interface ToastOptions {
  title?: string
  description?: ReactNode
  duration?: number
  type?: ToastType
  action?: {
    label: string
    onClick: () => void
  }
}

const toast = ({
  title,
  description,
  duration = 3000,
  type = 'default',
  action,
}: ToastOptions) => {
  const baseOptions = {
    description,
    duration,
    action: action
      ? {
          label: action.label,
          onClick: action.onClick,
        }
      : undefined,
  }

  if (type === 'default') {
    sonnerToast(title ?? '', baseOptions)
  } else if (
    type === 'success' ||
    type === 'error' ||
    type === 'warning' ||
    type === 'info'
  ) {
    sonnerToast[type](title ?? '', baseOptions)
  } else {
    // fallback to default
    sonnerToast(title ?? '', baseOptions)
  }
}

function useToast() {
  return {
    toast,
    success: (message: string, options?: Partial<ToastOptions>) =>
      toast({ ...options, title: message, type: 'success' }),
    error: (message: string, options?: Partial<ToastOptions>) =>
      toast({ ...options, title: message, type: 'error' }),
    warning: (message: string, options?: Partial<ToastOptions>) =>
      toast({ ...options, title: message, type: 'warning' }),
    info: (message: string, options?: Partial<ToastOptions>) =>
      toast({ ...options, title: message, type: 'info' }),
  }
}

export { useToast, toast }
