import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";
import "../css/stylesModal.css";

export const UsersPage = ({
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelectedForm,
    handlerOpenForm,
    handlerCloseForm }) => {

    return (<>
        {/* modal */}
        {!visibleForm || <UserModalForm userSelected={userSelected} initialUserForm={initialUserForm} handlerAddUser={handlerAddUser} handlerCloseForm={handlerCloseForm} />}

        <div className="container my-4">
            <h2>Users App</h2>
            <div className="row">
                <div className="col">
                    {visibleForm || <button onClick={handlerOpenForm} className="btn btn-primary my-2">Nuevo Usuario</button>}
                    {users.length === 0 ?
                        <div className="alert alert-warning">No hay usuarios en el sistema</div>
                        :
                        <UsersList users={users} handlerRemoveUser={handlerRemoveUser} handlerUserSelectedForm={handlerUserSelectedForm} />
                    }
                </div>
            </div>
        </div>
    </>);
};