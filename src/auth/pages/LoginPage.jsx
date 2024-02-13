import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const initialLoginForm = {
    username: '',
    password: ''
};

export function LoginPage() {

    const {handlerLogin} = useContext(AuthContext);
    const [loginForm, setLoginForm] = useState(initialLoginForm);
    const { username, password } = loginForm;

    const onInputChange = ({target}) => {
        const {name, value} = target;
        setLoginForm({
            ...loginForm,
            [name] : value
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (!(username != '') || !(password != '')) {
            Swal.fire({
                title: "Error de validación!",
                text: "Username y Password son requeridos.",
                icon: "error"
            });
        }
        handlerLogin({username, password});
        setLoginForm(initialLoginForm);
    };

    return (<>
        <br />
        <main className="form-signin w-50 m-auto ">
            <form onSubmit={onSubmit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <div className="form-floating">
                    <input onChange={ onInputChange } type="text" className="form-control" id="floatingInput" placeholder="Username" name="username" value={username}/>
                        <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating">
                    <input onChange={ onInputChange } type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" value={password} />
                        <label htmlFor="floatingPassword">Password</label>
                </div>
                <br />
                <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
            </form>
        </main>
    </>);
}