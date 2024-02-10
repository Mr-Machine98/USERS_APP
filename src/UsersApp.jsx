import { LoginPage } from "./auth/pages/LoginPage";
import { UsersPage } from "./pages/UsersPage";
import { NavBar } from "./components/layout/NavBar";
import { useAuth } from "./auth/hooks/useAuth";

export const UsersApp = () => {
    
    const { login, handlerLogin, handlerLogout } = useAuth();

    return (
        <>
            {login.isAuth == true ? (
                <>
                    <NavBar handlerLogout={handlerLogout} login={login} />
                    <UsersPage />
                </>
            ) : (
                <LoginPage handlerLogin={handlerLogin} />
            )}
        </>
    );
};
