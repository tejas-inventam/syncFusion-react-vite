// components/Loader.tsx
import React, { useEffect } from "react";
import {
  createSpinner,
  showSpinner,
  hideSpinner,
} from "@syncfusion/ej2-popups";

interface LoaderProps {
  show: boolean;
  message?: string;
  height?: string;
}

const Loader: React.FC<LoaderProps> = ({
  show,
  message = "Loading...",
  height = "200px",
}) => {
  const spinnerRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (spinnerRef.current) {
      createSpinner({
        target: spinnerRef.current,
        label: message,
      });
    }

    // Properly call show/hide spinner based on the `show` prop.
    if (spinnerRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      show ? showSpinner(spinnerRef.current) : hideSpinner(spinnerRef.current);
    }
  }, [show, message]);

  return (
    <div
      ref={spinnerRef}
      style={{
        height,
        width: "100%",
        position: "relative",
      }}
    ></div>
  );
};

export default Loader;
