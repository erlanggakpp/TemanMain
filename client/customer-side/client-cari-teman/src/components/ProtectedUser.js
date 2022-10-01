import { Navigate } from "react-router-dom";

export default function ProtectedUser(props) {
  const token = localStorage.access_token;

  if (!token) {
    return <Navigate to="/" replace />;
  }
  return props.children;
}
