import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

// expecting [{key, variant, content, setShowToast}]
function ToastShelf({ children }) {
  const toastElements = children.map((child) => (
    <li className={styles.toastWrapper} key={child.key}>
      <Toast variant={child.variant}>{child.content}</Toast>
    </li>
  ));

  return <ol className={styles.wrapper}>{toastElements}</ol>;
}

export default ToastShelf;
