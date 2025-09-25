import { type CSSProperties, type ReactNode } from "react";
import "../../styles/components/_button.scss";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  width?: string; // e.g. "100%", "200px" (default "50%")
  backgroundColor?: string; // base color
  hoverColor?: string; // hover color
  color?: string; // text color
  className?: string;
};

function Button({
  children,
  onClick,
  type = "button",
  width = "50%",
  backgroundColor = "var(--color-primary)",
  hoverColor = "var(--color-primary-dark)",
  color = "#fff",
  className = "",
}: ButtonProps) {
  // ✅ allow CSS variables without TS error
  const cssVars: CSSProperties & Record<string, string> = {
    "--btn-width": width,
    "--btn-bg-color": backgroundColor,
    "--btn-hover-color": hoverColor,
    "--btn-text-color": color,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${className}`}
      style={cssVars}
    >
      {children}
    </button>
  );
}

export default Button;