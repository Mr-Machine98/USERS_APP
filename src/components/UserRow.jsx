import { NavLink } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";

export const UserRow = ({user}) => {

    const { handlerRemoveUser, handlerUserSelectedForm} = useUsers();
    const onRemoveUser = (id) => handlerRemoveUser(id);
    const onUpdateUser = (u) => handlerUserSelectedForm(u);
    const { login } = useAuth();
    
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>

            { !login.isAdmin || <>
                <td>
                    <button onClick={() => onUpdateUser({...user})} type="button" className="btn btn-secondary btn-sm">update</button>
                </td>
                <td>
                    <NavLink className={'btn btn-secondary btn-sm'} to={'/users/edit/' + user.id}>📝</NavLink>
                </td>
                <td>
                    <button onClick={() => onRemoveUser(user.id)} type="button" className="btn btn-danger btn-sm">delete</button>
                </td>
            </>}
        </tr>
    );
};