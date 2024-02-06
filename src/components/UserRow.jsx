export const UserRow = ({user, handlerRemoveUser, handlerUserSelectedForm}) => {

    const onRemoveUser = (id) => handlerRemoveUser(id);
    const onUpdateUser = (u) => handlerUserSelectedForm(u);
    
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
                <button onClick={() => onUpdateUser({...user})} type="button" className="btn btn-secondary btn-sm">update</button>
            </td>
            <td>
                <button onClick={() => onRemoveUser(user.id)} type="button" className="btn btn-danger btn-sm">remove</button>
            </td>
        </tr>
    );
};