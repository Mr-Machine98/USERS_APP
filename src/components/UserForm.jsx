import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";

export const UserForm = ({ userSelected, handlerCloseForm }) => {

    const { handlerAddUser, initialUserForm } = useContext(UserContext);
    const [userForm, setUserForm] = useState(initialUserForm);
    const { id, username, password, email } = userForm;

    // Trigger que se dispara cuando cambia el valor del dato seleccionado
    useEffect(() => {
        setUserForm({
            ...userSelected
        });
    }, [userSelected]);

    const onInputChange = ({ target }) => {
        //console.log(target.value);
        let { name, value } = target;
        setUserForm({
            ...userForm,
            [name]: value
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        if (!(username != '') || !(password != '') || !(email != '')) {
            Swal.fire({
                title: "Error de validación",
                text: "Debe completar los campos del formulario!",
                icon: "error"
            });
            return;
        }

        console.log('send to form...');
        handlerAddUser(userForm);
        setUserForm(initialUserForm);

    };

    const onCloseForm = () => {
        handlerCloseForm();
        setUserForm(initialUserForm);
    };

    return (<>
        <form onSubmit={onSubmit} action="">
            <input onChange={onInputChange} className="form-control my-3 w-75" placeholder="Username" name="username" value={username} />
            {(id != 0) || <input onChange={onInputChange} type="password" className="form-control my-3 w-75" placeholder="Password" name="password" value={password} />}
            <input onChange={onInputChange} className="form-control my-3 w-75" placeholder="Email" name="email" value={email} />
            <input type="hidden" name="id" value={id} />
            <button type="submit" className="btn btn-primary">{(id != 0) ? 'Editar' : 'Crear'}</button>
            {handlerCloseForm != undefined ? <button onClick={() => onCloseForm()} type="button" className="btn btn-primary mx-2">Cerrar</button> : null }
        </form>
    </>);
};