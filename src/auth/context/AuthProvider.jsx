import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "./AuthContext";

export function AuthProvider({children}) {
    const { login, handlerLogin, handlerLogout } = useAuth();
    return (
        <AuthContext.Provider value={
            {
                login,
                handlerLogin,
                handlerLogout
            }
        }>
            {children}
        </AuthContext.Provider>
    );
}