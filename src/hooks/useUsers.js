import { useContext, useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/userService";
import { AuthContext } from "../auth/context/AuthContext";

const initialUsers = [];

const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
    onAdmin: false
};

const initialErrors = {
    username: '',
    password: '',
    email: ''
};

export function useUsers() {

    const [users, dispatch] = useReducer(usersReducer, initialUsers);
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const [visibleForm, setVisibleForm] = useState(false);
    const [errors, setErrors] = useState(initialErrors);
    const navigate = useNavigate();
    const { login, handlerLogout } = useContext(AuthContext);

    
    const getUsers = async () => {
        const result = await findAll();
        dispatch({
            type: 'loadingUsers',
            payload: result.data
        });
    };

    const handlerAddUser = async (user) => {

        if ( !login.isAdmin ) return;

        const {id, username, password, email, onAdmin} = user;
        let response;

        try {
            if (user.id === 0) response = await save({username, password, email, onAdmin});
            else response = await update({id, username, password: (password == undefined) ? 'passwordEmpty': password, email, onAdmin});

            dispatch({
                type: (user.id === 0) ? 'addUser' : 'updateUser',
                payload: response.data
            });

            // alert 
            Swal.fire({
                title: (user.id === 0) ? "Usuario Creado" : "Usuario Actualizado",
                text: (user.id === 0) ? "El usuario ha sido creado con exito!" : "El usuario ha sido actualizado con exito!",
                icon: "success"
            });
            handlerCloseForm();
            navigate("/users");
        } catch (error) {
            if(error.response && error.response.status == 400) {
                setErrors(error.response.data);
            } else if (error.response && error.response.status == 500) {
                // alert 
                Swal.fire({
                    title: "Espera un momento!",
                    text: "Verifica si el username o email ya se encuentran en el sistema.",
                    icon: "error"
                });
            } else if (error.response?.status == 401) {
                Swal.fire({
                    title: "Sesión expirada...",
                    text: "Lo sentimos, la sesión ha expirado.",
                    icon: "info"
                });
                handlerLogout();
            } else throw error;
        }
    };

    const handlerRemoveUser = (id) => {
        if ( !login.isAdmin ) return;
        // alert
        Swal.fire({
            title: "Esta seguro que desea eliminar?",
            text: "Cuidado el usuario sera elminado!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then( async (result) => {
            try {
                if (result.isConfirmed) {
                    await remove(id);
                    dispatch({
                        type: 'removeUser',
                        payload: id
                    });
                    Swal.fire({
                        title: "Usuario Eliminado!",
                        text: "El usuario ha sido eliminado con exito.",
                        icon: "success"
                    });
                }
            } catch (error) {
                if (error.response?.status == 401) {
                    Swal.fire({
                        title: "Sesión expirada...",
                        text: "Lo sentimos, la sesión ha expirado.",
                        icon: "info"
                    });
                    handlerLogout();
                }
                    
            }
        });
    };

    const handlerUserSelectedForm = (user) => {
        setUserSelected({ ...user });
        setVisibleForm(true);
    };

    const handlerOpenForm = () => {
        setVisibleForm(true);
    };

    const handlerCloseForm = () => {
        setVisibleForm(false);
        setUserSelected(initialUserForm);
        setErrors({});
    };

    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        errors,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers
    };
}