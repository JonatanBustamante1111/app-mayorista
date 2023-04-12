import axios from 'axios';

export const eApi = axios.create({
    baseURL: 'https://3897-181-67-104-163.ngrok-free.app/api/mp/'
})