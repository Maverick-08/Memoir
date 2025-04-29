/* eslint-disable react-refresh/only-export-components */
import { toast as sonnerToast } from 'sonner';
import { Info, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastType = 'info' | 'warning' | 'error' | 'success';

interface CustomToastProps {
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const ToastIcon = ({ type }: { type: ToastType }) => {
  const iconProps = {
    className: cn(
      "w-5 h-5 shrink-0 animate-pulse",
      type === 'info' && "text-blue-500",
      type === 'warning' && "text-amber-500",
      type === 'error' && "text-red-500",
      type === 'success' && "text-green-500",
    ),
    strokeWidth: 2
  };

  switch (type) {
    case 'info':
      return <Info {...iconProps} />;
    case 'warning':
      return <AlertTriangle {...iconProps} />;
    case 'error':
      return <XCircle {...iconProps} />;
    case 'success':
      return <CheckCircle {...iconProps} />;
    default:
      return null;
  }
};

const ToastContainer = ({ 
  type, 
  title, 
  message,
  action,
  className 
}: { 
  type: ToastType; 
  title: string; 
  message?: string;
  action?: { label: string; onClick: () => void };
  className?: string;
}) => {
  return (
    <div className={cn(
      "flex gap-3 min-w-[300px] max-w-[500px] p-4 rounded-lg shadow-lg border-l-4 animate-enter",
      type === 'info' && "bg-blue-50/90 border-blue-500",
      type === 'warning' && "bg-amber-50/90 border-amber-500",
      type === 'error' && "bg-red-50/90 border-red-500",
      type === 'success' && "bg-green-50/90 border-green-500",
      "dark:text-white",
      type === 'info' && "dark:bg-blue-900/90",
      type === 'warning' && "dark:bg-amber-900/90",
      type === 'error' && "dark:bg-red-900/90", 
      type === 'success' && "dark:bg-green-900/90",
      className
    )}>
      <div className="flex-shrink-0 pt-0.5">
        <ToastIcon type={type} />
      </div>
      <div className="flex-grow">
        <h3 className={cn(
          "font-medium text-sm",
          type === 'info' && "text-blue-800 dark:text-blue-300",
          type === 'warning' && "text-amber-800 dark:text-amber-300",
          type === 'error' && "text-red-800 dark:text-red-300",
          type === 'success' && "text-green-800 dark:text-green-300"
        )}>
          {title}
        </h3>
        {message && (
          <p className="text-sm mt-1 opacity-90 leading-tight">{message}</p>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className={cn("select-none",
              "mt-2 px-3 py-1 text-xs font-medium rounded-md transition-colors",
              type === 'info' && "bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-800/50 dark:hover:bg-blue-800 dark:text-blue-100",
              type === 'warning' && "bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-amber-800/50 dark:hover:bg-amber-800 dark:text-amber-100",
              type === 'error' && "bg-red-100 hover:bg-red-200 text-red-800 dark:bg-red-800/50 dark:hover:bg-red-800 dark:text-red-100",
              type === 'success' && "bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-800/50 dark:hover:bg-green-800 dark:text-green-100"
            )}
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
};

export const showToast = {
  info: ({ title, message, duration = 5000, action }: CustomToastProps) => {
    return sonnerToast.custom(
      (id) => (
        <ToastContainer 
          type="info" 
          title={title} 
          message={message}
          action={action ? {
            label: action.label,
            onClick: () => {
              action.onClick();
              sonnerToast.dismiss(id);
            }
          } : undefined}
        />
      ),
      { duration }
    );
  },
  
  warning: ({ title, message, duration = 8000, action }: CustomToastProps) => {
    return sonnerToast.custom(
      (id) => (
        <ToastContainer 
          type="warning" 
          title={title} 
          message={message}
          action={action ? {
            label: action.label,
            onClick: () => {
              action.onClick();
              sonnerToast.dismiss(id);
            }
          } : undefined}
        />
      ),
      { duration }
    );
  },
  
  error: ({ title, message, duration = 10000, action }: CustomToastProps) => {
    return sonnerToast.custom(
      (id) => (
        <ToastContainer 
          type="error" 
          title={title} 
          message={message}
          action={action ? {
            label: action.label,
            onClick: () => {
              action.onClick();
              sonnerToast.dismiss(id);
            }
          } : undefined}
        />
      ),
      { duration }
    );
  },
  
  success: ({ title, message, duration = 5000, action }: CustomToastProps) => {
    return sonnerToast.custom(
      (id) => (
        <ToastContainer 
          type="success" 
          title={title} 
          message={message}
          action={action ? {
            label: action.label,
            onClick: () => {
              action.onClick();
              sonnerToast.dismiss(id);
            }
          } : undefined}
        />
      ),
      { duration }
    );
  }
};