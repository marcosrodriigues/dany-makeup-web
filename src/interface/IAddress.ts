interface IAddress {
    id?: number,
    name: string,
    cep: string,
    street: string,
    number: string,
    complement: string,
    reference: string,
    neighborhood: string,
    city: string,
    uf: string
}

export default IAddress;