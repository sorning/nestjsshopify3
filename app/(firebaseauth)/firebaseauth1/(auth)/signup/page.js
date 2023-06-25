import Login from "../../components/login";
import SignUp from "../../components/singnup";
import { AuthContextProvider } from "../../context/AuthContext";

export default function SignUpPage() {
    return (
        <>
            <AuthContextProvider>
                <SignUp />
            </AuthContextProvider>
        </>
    )
}