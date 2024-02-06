import { useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";

const initialUsers = [
    {
        id: 1, 
        username: 'pepe',
        password: '12345',
        email: 'pepe@correo.com'
    }
];

const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: ''
};

export function useUsers() {

    const [users, dispatch] = useReducer(usersReducer, initialUsers);
    const [userSelected, setUserSelected] = useState(initialUserForm);

    const handlerAddUser = (user) => {
        let type = (user.id === 0) ? 'addUser': 'updateUser';
        dispatch({
            type: type,
            payload: user
        });
    };

    const handlerRemoveUser = (id) => {
        dispatch({
            type: 'removeUser',
            payload: id
        });
    };

    const handlerUserSelectedForm = (user) => {
        setUserSelected({...user});
    };

    return {
        users,
        userSelected,
        initialUserForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm
    };
}