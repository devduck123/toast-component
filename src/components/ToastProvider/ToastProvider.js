import React from "react";
import useEscapeKey from "../../hooks/useEscapeKey";

export const ToastContext = React.createContext();

const DEFAULT_VARIANT = "notice";

function ToastProvider({ children }) {
  const [radio, setRadio] = React.useState(DEFAULT_VARIANT);
  const [textarea, setTextarea] = React.useState("");
  const [toastArray, setToastArray] = React.useState([]);

  // call custom hook to start effect that
  // listens for escape key to close all toasts
  // also use useCallback to memoize function initialization
  const handleEscape = React.useCallback(() => {
    setToastArray(() => []);
  }, []);

  useEscapeKey(handleEscape);

  function changeTextarea(event) {
    setTextarea(() => event.target.value);
  }

  function changeRadio(event) {
    setRadio(() => event.target.value);
  }

  function addToast(event) {
    event.preventDefault();

    setToastArray((prevToastArray) => {
      const toast = {
        key: crypto.randomUUID(),
        variant: radio,
        content: textarea,
      };
      const newToastArray = [...prevToastArray, toast];

      return newToastArray;
    });

    // clear form data
    setTextarea(() => "");
    setRadio(() => DEFAULT_VARIANT);
  }

  const value = {
    radio,
    textarea,
    toastArray,
    changeRadio,
    changeTextarea,
    addToast,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
