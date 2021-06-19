import client from './client';

export const write = (formData) => client.post(
    '/write.php',
    formData,
)
