import { Navigate } from "react-router-dom";

export default function ProtectDashboard(props) {
    let token = localStorage.getItem("access_token")
    if (token) {
        return <Navigate to="/" replace />
    }
    return props.children
}