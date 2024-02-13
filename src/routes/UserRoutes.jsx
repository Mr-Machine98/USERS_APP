import { Navigate, Route, Routes } from "react-router-dom";
import { UsersPage } from "../pages/UsersPage";
import { NavBar } from "../components/layout/NavBar";
import { RegisterPage } from "../pages/RegisterPage";
import { useUsers } from "../hooks/useUsers";

export function UserRoutes({handlerLogout, login}) {

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

    return (<>
        <NavBar handlerLogout={handlerLogout} login={login} />
        <Routes>
            <Route path="users" element={<UsersPage users={users} userSelected={userSelected} visibleForm={visibleForm} handlerRemoveUser={handlerRemoveUser} handlerUserSelectedForm={handlerUserSelectedForm} initialUserForm={initialUserForm} handlerAddUser={handlerAddUser} handlerOpenForm={handlerOpenForm} handlerCloseForm={handlerCloseForm}/>} />
            <Route path="users/register" element={<RegisterPage initialUserForm={initialUserForm} handlerAddUser={handlerAddUser}/>}/>
            <Route path="users/edit/:id" element={<RegisterPage initialUserForm={initialUserForm} handlerAddUser={handlerAddUser} users={users}/>}/>
            <Route path="/" element={<Navigate to="/users"/>}/>
        </Routes>
    </>);
}