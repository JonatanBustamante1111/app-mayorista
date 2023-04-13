import axios from 'axios';

export const eApi = axios.create({
    baseURL: 'https://ecec-179-6-35-63.ngrok-free.app/api/mp/'
})