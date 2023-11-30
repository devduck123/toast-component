import React from "react";

import Button from "../Button";
import ToastShelf from "../ToastShelf/ToastShelf";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];
const DEFAULT_VARIANT = "notice";

function ToastPlayground() {
  const [radio, setRadio] = React.useState(DEFAULT_VARIANT);
  const [textarea, setTextarea] = React.useState("");
  const [toastArray, setToastArray] = React.useState([]);

  const radioElements = VARIANT_OPTIONS.map((option) => (
    <div
      className={`${styles.inputWrapper} ${styles.radioWrapper}`}
      key={option}
    >
      <label htmlFor={`variant-${option}`}>
        <input
          id={`variant-${option}`}
          type="radio"
          name="variant"
          value={option}
          checked={option === radio}
          onChange={changeRadio}
        />
        {option}
      </label>
    </div>
  ));

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

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      {/* ToastShelf */}
      <ToastShelf>{toastArray}</ToastShelf>

      <form onSubmit={addToast}>
        <div className={styles.controlsWrapper}>
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: "baseline" }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea
                id="message"
                className={styles.messageInput}
                value={textarea}
                onChange={changeTextarea}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              {radioElements}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label} />
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              <Button>Pop Toast!</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
