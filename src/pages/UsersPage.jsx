import { useContext, useEffect } from "react";
import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";
import { UserContext } from "../context/UserContext";
import "../css/stylesModal.css";
import { AuthContext } from "../auth/context/AuthContext";

export const UsersPage = () => {

    const {
        users,
        visibleForm,
        handlerOpenForm,
        getUsers} = useContext(UserContext);

    const {login} = useContext(AuthContext);    
    const findAll = async () => getUsers();

    // find all users
     useEffect(() => {
        findAll();
    }, []);

    return (<>
        {/* modal */}
        {!visibleForm || <UserModalForm />}

        <div className="container my-4">
            <h2>Users App</h2>
            <div className="row">
                <div className="col">
                    { (visibleForm || !login.isAdmin) || <button onClick={handlerOpenForm} className="btn btn-primary my-2">Nuevo Usuario</button>}
                    {users.length === 0 ?
                        <div className="alert alert-warning">No hay usuarios en el sistema</div>
                        :
                        <UsersList />
                    }
                </div>
            </div>
        </div>
    </>);
};