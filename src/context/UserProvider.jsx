import { useUsers } from "../hooks/useUsers";
import { UserContext } from "./UserContext";

export function UserProvider({ children }) {

    /**
     * Change this for context react
     */
    const {
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
        getUsers } = useUsers();

    return (
        <UserContext.Provider value={
            {
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
            }
        }>
            {children}
        </UserContext.Provider>
    );
}