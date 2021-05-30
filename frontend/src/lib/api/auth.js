import client from './client';

export const login = ({username, password}) => client.post(
    '/api/auth/login',
    {username, password},
)

export const register = ({username, password}) => client.post(
    '/api/auth/register',
    {username, password}
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