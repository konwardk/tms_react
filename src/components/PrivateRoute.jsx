// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token"); // same key used in axios

  if (!token) {
    // if no token, redirect to login
    return <Navigate to="/login" replace />;
  }

  return children; // if token exists, render the child component
}
