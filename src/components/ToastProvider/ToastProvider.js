import React from "react";

export const ToastContext = React.createContext();

const DEFAULT_VARIANT = "notice";

function ToastProvider({ children }) {
  const [radio, setRadio] = React.useState(DEFAULT_VARIANT);
  const [textarea, setTextarea] = React.useState("");
  const [toastArray, setToastArray] = React.useState([]);

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

  function clearToastsWithEsc(event) {
    if (event.code === "Escape") {
      setToastArray(() => []);
    }
  }

  const value = {
    radio,
    textarea,
    toastArray,
    changeRadio,
    changeTextarea,
    addToast,
    clearToastsWithEsc,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
