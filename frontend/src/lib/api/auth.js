import client from './client';

export const login = (formData) => client.post(
    '/login.php',
    formData,
    {
        headers : {
            'Content-type' : 'multipart/form-data',
            'charset' : 'utf-8'
        }
    }
)

export const register = ({id, password, passwordCheck, tel, gender, birth}) => client.get(
    '/register',
    {id, password, passwordCheck, tel, gender, birth}
)

export const check = () => client.get(
    '/api/auth/check',
    {
        headers: {
            'token' : localStorage.getItem('user')
        }
    }
)

export const logout = () => client.get(
    '/api/auth/logout'
)