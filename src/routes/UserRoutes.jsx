import { Navigate, Route, Routes } from "react-router-dom";
import { UsersPage } from "../pages/UsersPage";
import { NavBar } from "../components/layout/NavBar";
import { RegisterPage } from "../pages/RegisterPage";
import { useAuth } from "../auth/hooks/useAuth";

export function UserRoutes() {

    const { login } = useAuth();
    return (<>
        {/* <UserProvider> */ }
            <NavBar />
            <Routes>
                <Route path="users" element={<UsersPage />} />
                { !login.isAdmin || <>
                    <Route path="users/register" element={<RegisterPage />} />
                    <Route path="users/edit/:id" element={<RegisterPage />} />
                </>}
                <Route path="/" element={<Navigate to="/users" />} />
            </Routes>
        {/* </UserProvider> */ }
    </>);
}