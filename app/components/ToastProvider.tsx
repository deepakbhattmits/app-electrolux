"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

type ToastType = "success" | "error";

type ToastMessage = {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
};

type ToastActions = {
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
};

const ToastContext = createContext<ToastActions | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = (id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  };

  const addToast = (type: ToastType, title: string, description?: string) => {
    const id = crypto.randomUUID();
    setToasts((current) => [{ id, type, title, description }, ...current]);

    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 4000);
  };

  const value = useMemo(
    () => ({
      success: (title: string, description?: string) => addToast("success", title, description),
      error: (title: string, description?: string) => addToast("error", title, description),
    }),
    []
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="pointer-events-none fixed inset-x-0 top-5 z-50 flex flex-col items-center gap-3 px-4 sm:items-end sm:pr-6">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto w-full max-w-sm rounded-3xl border border-zinc-200/80 bg-white/95 p-4 shadow-2xl shadow-zinc-900/5 ring-1 ring-zinc-900/5 backdrop-blur-xl"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl ${toast.type === "success"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
                  }`}
              >
                {toast.type === "success" ? (
                  <CheckCircle className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <XCircle className="h-5 w-5" aria-hidden="true" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-semibold ${toast.type === "success" ? "text-zinc-950" : "text-zinc-950"}`}>
                  {toast.title}
                </p>
                {toast.description ? (
                  <p className="mt-1 text-sm leading-6 text-zinc-600">{toast.description}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-zinc-400 transition hover:text-zinc-700"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
