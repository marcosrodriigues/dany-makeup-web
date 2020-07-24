import axios from 'axios';

const type = 'test';

const baseURL = 
    type === 'test' ? 'https://api-danymakeup.herokuapp.com' :
    type === 'prod' ? 'http://192.168.2.14:3333' :
    'http://192.168.2.14:3333'

const api = axios.create({
    baseURL
}) ;

export default api;

export const api_ibge = axios.create({
    baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades'
})

export const api_cep = axios.create({
    baseURL: 'https://viacep.com.br/ws'
})

