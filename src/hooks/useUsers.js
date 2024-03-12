import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { addUser, loadingUsers, onCloseForm, onOpenForm, onUserSelectedForm, removeUser, updateUser, initialUserForm, onError } from "../store/slices/users/usersSlice";
import { useAuth } from "../auth/hooks/useAuth";

export function useUsers() {

    const dispatch = useDispatch();
    const {users, userSelected, visibleForm, errors} = useSelector( state => state.users );
    const navigate = useNavigate();
    const { login, handlerLogout } = useAuth();

    const getUsers = async () => {

        try {
            const result = await findAll();
            dispatch(loadingUsers(result.data));
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
    };

    const handlerAddUser = async (user) => {

        if ( !login.isAdmin ) return;

        const {id, username, password, email, onAdmin} = user;
        let response;

        try {

            if (user.id === 0) {
                response = await save({username, password, email, onAdmin});
                dispatch(addUser(response.data));
            } else {
                response = await update({id, username, password: (password == undefined) ? 'passwordEmpty': password, email, onAdmin});
                dispatch(updateUser(response.data));
            } 

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
                dispatch(onError(error.response.data));
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
                    dispatch(removeUser(id))
                    
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

    const handlerUserSelectedForm = (user) => dispatch( onUserSelectedForm(user) );

    const handlerOpenForm = () => dispatch(onOpenForm());

    const handlerCloseForm = () => {
        dispatch( onCloseForm() );
        dispatch( onError({}) );
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