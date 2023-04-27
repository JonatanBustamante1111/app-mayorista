import axios from 'axios';

const eApi = axios.create({
    /* baseURL: 'https://api.crv4mayorista.com/api/mp/' */
    baseURL: 'http://localhost:3000/api/mp'
})

export default eApi;