import Login from "./components/login";
import SignUp from "./components/singnup";
import { AuthContextProvider } from "./context/AuthContext";

export default function App() {
    return (
        <>
            <AuthContextProvider>
                <SignUp />
                <Login />
            </AuthContextProvider>
        </>
    )
}