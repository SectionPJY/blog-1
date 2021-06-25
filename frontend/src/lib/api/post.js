import client from './client';

export const write = (formData) => client.post(
    '/write.php',
    formData,
)

export const list = (formData) => client.post(
    '/list.php',
    formData
)