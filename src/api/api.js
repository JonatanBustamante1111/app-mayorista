import axios from 'axios';

const eApi = axios.create({
    baseURL: 'http://crv4mayorista.com/api/mp/'
})

export default eApi;