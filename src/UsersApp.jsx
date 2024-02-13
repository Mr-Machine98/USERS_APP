import { LoginPage } from "./auth/pages/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";
import { useContext } from "react";
import { AuthContext } from "./auth/context/AuthContext";

export const UsersApp = () => {
    const {login} = useContext(AuthContext);
    return (
        <Routes>
            {/**Aqui debemos aplicar Routes */}
            {login.isAuth == true ? (
                <>
                    <Route path="/*" element={<UserRoutes />} />
                </>
            ) : (<>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/*" element={<Navigate to={"/login"} />  }/>
            </>)}
        </Routes>
    );
};
