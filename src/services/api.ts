import axios from 'axios';

const api = axios.create({
    baseURL : process.env.DANY_MAKEUP_API || 'http://192.168.2.14:3333'
}) ;

export default api;

export const api_ibge = axios.create({
    baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades'
})

export const api_cep = axios.create({
    baseURL: 'https://viacep.com.br/ws'
})

