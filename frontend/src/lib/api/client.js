import axios from 'axios';

const client = axios.create({
    headers : {
        'Content-type' : 'multipart/form-data',
        'charset' : 'utf-8'
    }
});

export default client;