import React from "react";

export default function FormErrorMessage({ message }) {
  return (
    <span
      style={{
        color: "red",
        fontSize: "11px",
        marginTop: "4px",
      }}
    >
      {message}
    </span>
  );
}
