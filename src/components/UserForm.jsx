import { useState } from "react";

const initialUserForm = {
    username: '',
    password: '',
    email: ''
};

export const UserForm = () => {

    const [userForm, setUserForm] = useState(initialUserForm);
    const {username, password, email} = userForm;

    const onInputChange = ({target}) => {
        //console.log(target.value);
        let {name, value} = target;
        setUserForm({
            ...userForm,
            [name]: value
        });
    };

    return (<form action="">

        <input onChange={ onInputChange } className="form-control my-3 w-75" placeholder="Username" name="username" value={username}/>

        <input onChange={ onInputChange } type="password" className="form-control my-3 w-75" placeholder="Password" name="password" value={password}/>

        <input onChange={ onInputChange } className="form-control my-3 w-75" placeholder="Email" name="email" value={email}/>

        <button type="submit" className="btn btn-primary">Crear</button>

    </form>);
};