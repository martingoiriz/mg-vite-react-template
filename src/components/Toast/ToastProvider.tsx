import { useMemo, useState } from "react";
import { createPortal } from "react-dom";

import { Toast } from "./Toast";
import { ToastContext } from "./ToastContext";

// Create a random ID
function generateUEID() {
  const first = (Math.random() * 46656) | 0;
  const second = (Math.random() * 46656) | 0;

  const firstConverted = ("000" + first.toString(36)).slice(-3);
  const secondConverted = ("000" + second.toString(36)).slice(-3);

  return firstConverted + secondConverted;
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const displayToast = ({ content, type }) =>
    setToasts((currentToasts) => [...currentToasts, { content, type, id: generateUEID() }]);
  const close = (id) =>
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));

  const contextValue = useMemo(() => ({ displayToast }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {createPortal(
        <div className="toasts-wrapper">
          {toasts.map((toast) => (
            <Toast type={toast.type} key={toast.id} close={() => close(toast.id)}>
              {toast.content}
            </Toast>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};
