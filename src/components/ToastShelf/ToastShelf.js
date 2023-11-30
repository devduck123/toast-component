import React from "react";

import Toast from "../Toast";
import { ToastContext } from "../ToastProvider/ToastProvider";
import styles from "./ToastShelf.module.css";

// expecting [{key, variant, content, setShowToast}]
function ToastShelf({ children }) {
  const { clearToastsWithEsc } = React.useContext(ToastContext);

  React.useEffect(() => {
    window.addEventListener("keydown", clearToastsWithEsc);

    return () => {
      window.removeEventListener("keydown", clearToastsWithEsc);
    };
  }, [clearToastsWithEsc]);

  const toastElements = children.map((child) => (
    <li className={styles.toastWrapper} key={child.key}>
      <Toast variant={child.variant}>{child.content}</Toast>
    </li>
  ));

  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="polite"
      aria-label="Notification"
    >
      {toastElements}
    </ol>
  );
}

export default ToastShelf;
