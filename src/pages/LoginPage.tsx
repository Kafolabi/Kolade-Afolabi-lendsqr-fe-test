// import type { FormEvent } from "react";
// import { useState } from "react";
// import AuthLayout from "../components/layout/AuthLayout";
// import "../styles/pages/_loginPage.scss";
// import Button from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import { Link, useNavigate } from "react-router-dom";

// function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//     const navigate = useNavigate(); // <--- here

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();

//     // Fake authentication check
//     if (email === "admin@lendsqr.com" && password === "password") {
//       localStorage.setItem("authToken", "fake-token"); // store token
//       navigate("/"); // go to DashboardPage after login
//     } else {
//       alert("Invalid credentials");
//     }
//   };


//   // const handleSubmit = (e: FormEvent) => {
//   //   e.preventDefault();
//   //   console.log({ email, password });
//   //   // TODO: hook up to API/auth service
//   // };

//   return (
//     <AuthLayout>
//       <div className="login-page">
//         <form className="login-form" onSubmit={handleSubmit}>
//           <div>
//             <h1 className="login-form__title">Welcome!</h1>
//             <p className="login-form__subtitle">Enter details to login</p>
//           </div>

//           {/* Email Input */}
//           <Input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           {/* Password Input with Show/Hide */}
//           <Input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             showToggle
//           />

//           {/* Actions */}
//           <div className="form-actions">
//             <a href="/reset-password" className="forgot-password">
//               FORGOT PASSWORD?
//             </a>
//             <Link to="/">
//             <Button type="submit" width="100%">
//               LOG IN
//             </Button>
//             </Link>
//           </div>
//         </form>
//       </div>
//     </AuthLayout>
//   );
// }

// export default LoginPage;



// src/pages/LoginPage.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/apiAuth"; // your fake auth
import AuthLayout from "../components/layout/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import "../styles/pages/_loginPage.scss";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard/users"); // redirect to dashboard/users
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <AuthLayout>
      <div className="login-page">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-form__title">Welcome!</h1>
          <p className="login-form__subtitle">Enter details to login</p>

          {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

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
            <Button type="submit" width="100%">LOG IN</Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
