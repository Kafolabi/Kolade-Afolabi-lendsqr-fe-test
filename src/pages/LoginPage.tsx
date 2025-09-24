import type { FormEvent } from "react";
import { useState } from "react";
import AuthLayout from "../components/layout/AuthLayout";
import "../styles/pages/_loginPage.scss";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
    // TODO: hook up to API/auth service
  };

  return (
    <AuthLayout>
      <div className="login-page">
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <h1 className="login-form__title">Welcome!</h1>
            <p className="login-form__subtitle">Enter details to login</p>
          </div>

          {/* Email Input */}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input with Show/Hide */}
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showToggle
          />

          {/* Actions */}
          <div className="form-actions">
            <a href="/reset-password" className="forgot-password">
              FORGOT PASSWORD?
            </a>
            <Button type="submit" width="100%">
              LOG IN
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
