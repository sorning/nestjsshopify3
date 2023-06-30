import UpdateProfile from "../../components/updateprofile";
import { AuthContextProvider } from "../../context/AuthContext";

export default function UpdateProfilePage() {
    return (
        <AuthContextProvider>
            <UpdateProfile />
        </AuthContextProvider>
    )
}