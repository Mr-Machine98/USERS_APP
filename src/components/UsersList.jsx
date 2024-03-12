import { UserRow } from "./UserRow";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";

export const UsersList = () => {

    const { users = [] } = useUsers();
    const { login } = useAuth();

    return (<table className="table table-hover table-striped">
        <thead>
            <tr>
                <th>#</th>
                <th>username</th>
                <th>email</th>
                { !login.isAdmin || <>
                    <th>update</th>
                    <th>👤</th>
                    <th>remove</th>
                </>}
            </tr>
        </thead>
        <tbody>
            {
                users.map(user => {
                    return (
                        <UserRow key={user.id} user={user}/>
                    );
                })
            }
        </tbody>
    </table>);
};