import { useEffect } from "react";
import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";
import "../css/stylesModal.css";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";
import { useParams } from "react-router-dom";
import { Paginator } from "../components/Paginator";

export const UsersPage = () => {

    const {
        users,
        visibleForm,
        paginator,
        handlerOpenForm,
        getUsers} = useUsers();

    const {login} = useAuth();    
    const {page} = useParams();
    const findAll = async (page) => getUsers(page);

    // find all users
    useEffect(() => {
        findAll(page);
    }, [page]);

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
                        <>
                            <UsersList />
                            <Paginator url={"/users/page/"} paginator={paginator}/>
                        </>
                    }
                </div>
            </div>
        </div>
    </>);
};