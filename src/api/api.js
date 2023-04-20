import axios from 'axios';

const eApi = axios.create({
    baseURL: 'http://194.195.86.54:3000/api/mp/'
})

export default eApi;