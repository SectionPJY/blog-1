export default function decodeJWT(auth) {
    return atob(auth.toString().split('.')[1])
}