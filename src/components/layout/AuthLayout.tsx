import type { ReactNode } from "react";
import "../../styles/layouts/_authLayout.scss";

interface AuthLayoutProps {
  children: ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="auth-layout">
      {/* Left side - illustration/branding */}
      <div className="auth-layout__left">
        <img
          src="/logo.png"
          alt="Logo"
          width={150}
          className="auth-layout__logo"
        />
        <img
          src="/login-image2.png"
          alt="Authentication Illustration"
          className="auth-layout__illustration"
        />
      </div>

      {/* Right side - form content */}
      <div className="auth-layout__right">{children}</div>
    </div>
  );
}

export default AuthLayout;
