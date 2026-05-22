import { useState } from "react";
import { loginUser } from "../services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });

      console.log("LOGIN SUCCESS:", res.data);

      // ✅ SAVE TOKEN
      localStorage.setItem("token", res.data.token);

      // ✅ SAVE USER (IMPORTANT FOR RBAC)
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");

      // ✅ REDIRECT TO DASHBOARD
      window.location.href = "/dashboard";

    } catch (err) {
      console.log("LOGIN ERROR:", err);
      alert(
        err?.response?.data?.message || "Login failed. Check backend."
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}