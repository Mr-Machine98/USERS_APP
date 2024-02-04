import { UserRow } from "./UserRow";

export const UsersList = ({ users = [], handlerRemoveUser }) => {
    return (<table className="table table-hover table-striped">
        <thead>
            <tr>
                <th>#</th>
                <th>username</th>
                <th>email</th>
                <th>update</th>
                <th>remove</th>
            </tr>
        </thead>
        <tbody>
            {
                users.map(user => {
                    return (
                        <UserRow  key={user.id} user={user} handlerRemoveUser={handlerRemoveUser} />
                    );
                })
            }
        </tbody>
    </table>);
};