export default function decodeJWT(auth) {
    return atob(auth.split('.')[1]);
}