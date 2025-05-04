import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from './PublicNavbar';
import { AlertCircle, Check, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export const ToastContext = React.createContext<{
  toasts: Toast[];
  addToast: (message: string, type: ToastType) => void;
  removeToast: (id: string) => void;
}>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

const PublicLayout: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const getToastIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <Check className="h-5 w-5" />;
      case 'error':
        return <X className="h-5 w-5" />;
      case 'warning':
      case 'info':
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };
  
  const getToastClasses = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-success-50 text-success-700 border-success-500';
      case 'error':
        return 'bg-error-50 text-error-700 border-error-500';
      case 'warning':
        return 'bg-warning-50 text-warning-700 border-warning-500';
      case 'info':
      default:
        return 'bg-primary-50 text-primary-700 border-primary-500';
    }
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      <div className="min-h-screen flex flex-col">
        <PublicNavbar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
        
        {/* Toast Messages */}
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
          {toasts.map(toast => (
            <div 
              key={toast.id}
              className={`${getToastClasses(toast.type)} p-4 rounded-lg shadow-md border-l-4 flex items-center min-w-[320px] animate-slide-up backdrop-blur-xl bg-opacity-80`}
            >
              <div className="mr-3">
                {getToastIcon(toast.type)}
              </div>
              <div className="flex-1">{toast.message}</div>
              <button 
                onClick={() => removeToast(toast.id)}
                className="ml-2 text-neutral-400 hover:text-neutral-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

export default PublicLayout; 