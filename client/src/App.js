import React from "react";
import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import { getToken, clearToken } from "./api";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SearchDetails from "./pages/SearchDetails";

import "./App.css";

function Protected({ children }) {
  return getToken() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const nav = useNavigate();

  return (
    <div className="shell">
      <div className="navbar">
        <div className="brand">
          <div className="brand-badge" />
          <span>Bing Search Manager</span>
        </div>

        <div className="nav-actions">
          <Link className="nav-link" to="/">Home</Link>

          {getToken() ? (
            <button
              className="btn"
              onClick={() => {
                clearToken();
                nav("/login");
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <Link className="btn" to="/login">Login</Link>
              <Link className="btn btn-primary" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Protected><Dashboard /></Protected>} />
        <Route path="/searches/:id" element={<Protected><SearchDetails /></Protected>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}
