import client from './client';

export const logout = client.get('http://localhost:80/logout.php');