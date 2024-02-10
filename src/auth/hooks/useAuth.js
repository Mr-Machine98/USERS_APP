import { useReducer } from "react";
import { LoginReducer } from "../reducers/LoginReducer";
import Swal from "sweetalert2";
import { loginUser } from "../services/authService";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    user: undefined
};

export function useAuth() {


    const [login, dispatch] = useReducer(LoginReducer, initialLogin);

    

    const handlerLogin = (userLogin) => {
        if (loginUser(userLogin)) {
            const user = {...userLogin};

            dispatch({
                type: 'login',
                payload: user
            });

            Swal.fire({
                title: "Iniciaste!",
                text: "Bienvenido.",
                icon: "success"
            });

            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                user: user
            }));
        } else {
            Swal.fire({
                title: "Error Login!",
                text: "Username o Password invalidos.",
                icon: "error"
            });
        }
    };

    const handlerLogout = () => {
        dispatch({
            type: 'logout',
        });
        sessionStorage.removeItem('login');
    };

    return {
        login,
        handlerLogin,
        handlerLogout
    };
}