import { Navigate } from "react-router-dom";

export default function ProtectAdmin(props) {
    let token = localStorage.getItem("access_token")

    if (!token) {
        return <Navigate to="/login" replace />
    }
    return props.children
}