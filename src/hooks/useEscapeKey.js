import React from "react";

export default function useEscapeKey(callback) {
  React.useEffect(() => {
    function clearToastsWithEsc(event) {
      if (event.code === "Escape") {
        callback(event);
      }
    }

    window.addEventListener("keydown", clearToastsWithEsc);

    return () => {
      window.removeEventListener("keydown", clearToastsWithEsc);
    };
  }, [callback]);
}
