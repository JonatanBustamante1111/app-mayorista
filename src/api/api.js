import axios from 'axios';

export const eApi = axios.create({
    baseURL: 'https://07ac-181-67-104-89.ngrok-free.app/api/mp/'
})