import { useState } from "react";
import "../../styles/components/_input.scss";

type InputProps = {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showToggle?: boolean; // for password inputs
  rightText?: string; // e.g. "SHOW", "HIDE", "kg"
  onRightTextClick?: () => void; // handle toggle or custom action
};

function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  showToggle = false,
  rightText,
  onRightTextClick,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    showToggle && type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="form-group">
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      {(showToggle || rightText) && (
        <button
          type="button"
          className="toggle-password"
          onClick={() => {
            if (showToggle) setShowPassword(!showPassword);
            if (onRightTextClick) onRightTextClick();
          }}
        >
          {showToggle ? (showPassword ? "HIDE" : "SHOW") : rightText}
        </button>
      )}
    </div>
  );
}

export default Input;
