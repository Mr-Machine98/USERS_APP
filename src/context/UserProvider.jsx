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
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm } = useUsers();

    return (
        <UserContext.Provider value={
            {
                users,
                userSelected,
                initialUserForm,
                visibleForm,
                handlerAddUser,
                handlerRemoveUser,
                handlerUserSelectedForm,
                handlerOpenForm,
                handlerCloseForm
            }
        }>
            {children}
        </UserContext.Provider>
    );
}