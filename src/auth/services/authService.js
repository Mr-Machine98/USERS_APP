export function loginUser(userLogin) {
    return (userLogin.username == 'admin' && userLogin.password == '123');
}