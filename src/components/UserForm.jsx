import { useEffect, useState } from "react";
import { useUsers } from "../hooks/useUsers";

export const UserForm = ({ userSelected, handlerCloseForm }) => {

    const { handlerAddUser, initialUserForm, errors } = useUsers();
    const [userForm, setUserForm] = useState(initialUserForm);
    const { id, username, password, email, onAdmin } = userForm;
    const [checked, setChecked] = useState(userForm.onAdmin);

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

    const onCheckBoxChange = () => { 
        setChecked(!checked);
        setUserForm({
            ...userForm,
            onAdmin: checked
        }); 
    }

    const onSubmit = (event) => {
        event.preventDefault();

        // if (!(username != '') || !(password != '') || !(email != '')) {
        //     Swal.fire({
        //         title: "Error de validación",
        //         text: "Debe completar los campos del formulario!",
        //         icon: "error"
        //     });
        //     return;
        // }
        console.log(`send OBJ to controller...`);
        handlerAddUser(userForm);
        //setUserForm(initialUserForm);
    };

    const onCloseForm = () => {
        handlerCloseForm();
        setUserForm(initialUserForm);
    };

    return (<>
        <form onSubmit={onSubmit} action="">

            <input onChange={onInputChange} className="form-control my-3 w-75" placeholder="Username" name="username" value={username} />
            <p className="text-danger">{errors?.username}</p>
            
            <input onChange={onInputChange} type="password" className="form-control my-3 w-75" placeholder="Password" name="password" value={ (password == undefined) ? '': password} />
            <p className="text-danger">{errors?.password}</p>
            
            <input onChange={onInputChange} className="form-control my-3 w-75" placeholder="Email" name="email" value={email} />
            <p className="text-danger">{errors?.email}</p>

            <div className="my-3 form-check">
                <input onChange={onCheckBoxChange} type="checkbox" name="onAdmin" checked={onAdmin} className="form-check-input"/>
                <label className="form-check-label">Admin</label>
            </div>
            
            <input type="hidden" name="id" value={id} />
            <button type="submit" className="btn btn-primary">{(id != 0) ? 'Editar' : 'Crear'}</button>
            {handlerCloseForm != undefined ? <button onClick={() => onCloseForm()} type="button" className="btn btn-primary mx-2">Cerrar</button> : null }
        </form>
    </>);
};