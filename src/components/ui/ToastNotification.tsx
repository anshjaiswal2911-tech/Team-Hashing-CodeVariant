import React, { useEffect } from 'react';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastNotificationProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

const typeStyles: Record<ToastType, { icon: string; border: string; bg: string; text: string }> = {
  success: {
    icon: 'check_circle',
    border: 'border-secondary/50',
    bg: 'bg-surface-container',
    text: 'text-secondary',
  },
  info: {
    icon: 'info',
    border: 'border-primary/50',
    bg: 'bg-surface-container',
    text: 'text-primary',
  },
  warning: {
    icon: 'warning',
    border: 'border-[#DE8553]/50',
    bg: 'bg-surface-container',
    text: 'text-[#DE8553]',
  },
  error: {
    icon: 'error',
    border: 'border-error/50',
    bg: 'bg-surface-container',
    text: 'text-error',
  },
};

export const ToastNotification: React.FC<ToastNotificationProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => {
        const style = typeStyles[toast.type];

        return (
          <ToastItem
            key={toast.id}
            toast={toast}
            style={style}
            onDismiss={() => onDismiss(toast.id)}
          />
        );
      })}
    </div>
  );
};

const ToastItem: React.FC<{
  toast: ToastMessage;
  style: { icon: string; border: string; bg: string; text: string };
  onDismiss: () => void;
}> = ({ toast, style, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, toast.duration || 4000);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  return (
    <div
      role="alert"
      className={`pointer-events-auto p-4 rounded-2xl border ${style.border} ${style.bg} shadow-2xl backdrop-blur-md flex items-start gap-3 animate-in slide-in-from-bottom-5 fade-in transition-all`}
    >
      <span className={`material-symbols-outlined text-xl ${style.text}`}>
        {style.icon}
      </span>
      <div className="flex-1 space-y-0.5">
        <h4 className="text-xs font-semibold text-on-surface font-sans">{toast.title}</h4>
        {toast.description && (
          <p className="text-[11px] text-on-surface-variant font-sans leading-tight">
            {toast.description}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="text-on-surface-variant hover:text-on-surface transition-colors"
      >
        <span className="material-symbols-outlined text-sm">close</span>
      </button>
    </div>
  );
};
