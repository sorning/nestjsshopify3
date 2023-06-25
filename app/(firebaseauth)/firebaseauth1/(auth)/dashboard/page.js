import Dashboard from "../../components/dashboard";
import { AuthContextProvider } from "../../context/AuthContext";

export default function DashboardPage() {
    return (
        <AuthContextProvider>
            <Dashboard />
        </AuthContextProvider>
    )
}