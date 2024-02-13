import { useEffect, useState } from "react";
import { UserForm } from "../components/UserForm";
import { useParams } from "react-router-dom";

export function RegisterPage({users = [], initialUserForm, handlerAddUser }) {

    const [userSelected, setUserSelected] = useState(initialUserForm);
    const {id} = useParams();

    useEffect(() => {
        console.log(id);
        if (id) {
            const user = users.find( u => u.id == id) || initialUserForm;
            setUserSelected(user);
        }
    },[id]);
    
    return (<>
        <div className="container">
            <br />
            <h4>{userSelected.id != 0 ? 'Editar' : 'Registrar'} Usuario</h4>
            <div className="row">
                <div className="col">
                    <UserForm userSelected={userSelected} initialUserForm={initialUserForm} handlerAddUser={handlerAddUser}  />
                </div>
            </div>
        </div>
    </>);
}