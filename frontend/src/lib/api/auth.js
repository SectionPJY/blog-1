import client from './client';

export const login = (formData) => client.post(
    '/login.php',
    formData,
)

export const register = (formData) => client.post(
    '/register.php',
    formData,
)

export const logout = () => client.post(
    '/logout.php'
)

export const check = (formData) => client.post(
    '/check.php',
    formData
)