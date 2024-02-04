export const UserRow = ({user, handlerRemoveUser}) => {

    const onRemoveUser = (id) => handlerRemoveUser(id);
    
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
                <button type="button" className="btn btn-secondary btn-sm">update</button>
            </td>
            <td>
                <button onClick={() => onRemoveUser(user.id)} type="button" className="btn btn-danger btn-sm">remove</button>
            </td>
        </tr>
    );
};