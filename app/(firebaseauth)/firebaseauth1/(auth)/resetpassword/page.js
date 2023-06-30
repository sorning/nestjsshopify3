import { AuthContextProvider } from "../../context/AuthContext"
import ResetPassword from "../../components/resetpassword"

export default function ResetPasswordPage() {
    return (
        <AuthContextProvider>
            <ResetPassword />
        </AuthContextProvider>
    )
}