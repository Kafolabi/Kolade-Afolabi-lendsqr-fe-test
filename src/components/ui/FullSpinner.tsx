import { type CSSProperties } from "react";

const spinnerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(255, 255, 255, 0.8)",
  zIndex: 9999,
};

const circleStyle = {
  width: "60px",
  height: "60px",
  border: "8px solid #f3f3f3",
  borderTop: "8px solid #3498db",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const spinnerKeyframes = `
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;

function FullSpinner() {
  return (
    <>
      <style>{spinnerKeyframes}</style>
      <div style={spinnerStyle as CSSProperties}>
        <div style={circleStyle}></div>
      </div>
    </>
  );
}

export default FullSpinner;
