import axios from 'axios';

const eApi = axios.create({
    baseURL: 'https://api.crv4mayorista.com/api/mp/'
})

export default eApi;