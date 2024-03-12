import Swal from "sweetalert2";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onLogin, onLogout } from "../../store/slices/auth/authSlice";

export function useAuth() {

    const dispatch = useDispatch();
    const { user, isAdmin, isAuth } = useSelector( state => state.auth );
    const navigate = useNavigate();
    

    const handlerLogin = async (userLogin) => {

        try {

            const response = await loginUser(userLogin);
            const token = response.data.token;
            const claims = JSON.parse(window.atob(token.split(".")[1]));
            const user = {username: claims.username};

            dispatch( onLogin( {user, isAdmin: claims.isAdmin} ) );

            Swal.fire({
                title: "Iniciaste!",
                text: "Bienvenido.",
                icon: "success"
            });

            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                user: user,
                isAdmin: claims.isAdmin
            }));

            sessionStorage.setItem('token', `Bearer ${token}`);
            navigate('/users');

        } catch (error) {

            const status = error.response?.status;

            switch (status) {
                case 401:
                    Swal.fire({
                        title: "Error Login!",
                        text: "Username o Password invalidos.",
                        icon: "error"
                    });
                    break;

                case 403:
                    Swal.fire({
                        title: "Error Login!",
                        text: "No tiene acceso al recurso o permisos!",
                        icon: "error"
                    });
                    break;
                    
                default:
                    throw error;
            }

        }
    };

    const handlerLogout = () => {
        dispatch(onLogout());
        sessionStorage.removeItem('login');
        sessionStorage.removeItem('token');
        sessionStorage.clear();
    };

    return {
        login: { user, isAdmin, isAuth },
        handlerLogin,
        handlerLogout
    };
}