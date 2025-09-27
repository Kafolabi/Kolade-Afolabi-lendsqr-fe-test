import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/apiAuth";
import AuthLayout from "../components/layout/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import toast from "react-hot-toast";
import "../styles/pages/_loginPage.scss";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Login successful!");
      navigate("/dashboard/users");
    } catch (err) {
      toast.error((err as Error).message || "Login failed");
    }
  };

  return (
    <AuthLayout>
      <div className="login-page">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-form__title">Welcome!</h1>
          <p className="login-form__subtitle">Enter details to login</p>

          {/* Email Input */}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input */}
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showToggle
          />

          {/* Submit */}
          <div className="form-actions">
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
