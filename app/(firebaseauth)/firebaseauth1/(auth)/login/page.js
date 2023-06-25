import Login from "../../components/login";
import { AuthContextProvider } from "../../context/AuthContext";

export default function LoginPage() {
    return (
        <AuthContextProvider>
            <Login />
        </AuthContextProvider>
    )
}