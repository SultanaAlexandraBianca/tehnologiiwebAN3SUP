import React, { useState } from "react";
import { api, setToken } from "../api";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      const { token } = await api.login(email, password);
      setToken(token);
      nav("/");
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome back</h2>

        <form onSubmit={onSubmit}>
          <input
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Sign in</button>
        </form>

        {err && <p className="error">{err}</p>}
      </div>
    </div>
  );
}
