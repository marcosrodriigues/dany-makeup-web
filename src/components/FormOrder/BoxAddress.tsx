import React from 'react';

const BoxAddress = ({
    address
}) => {
    return (
        !address ? <></> : 
        <>
            <div>
                <h4>Endereço de cobrança/entrega: </h4>
            </div>

            <label className="col-form-label col-sm-4">Nome do endereço</label>
            <label className="col-form-label col-sm-8 right">{address.name}</label>

            <label className="col-form-label col-sm-4">Endereço: </label>
            <label className="col-form-label col-sm-8 right">{`${address.street}, nº ${address.number}, ${address.neighborhood}.`}</label>

            <label className="col-form-label col-sm-4">UF/Cidade</label>
            <label className="col-form-label col-sm-8 right">{`${address.uf}/${address.city}`}</label>

            <label className="col-form-label col-sm-4">CEP: </label>
            <label className="col-form-label col-sm-8 right">{address.cep}</label>   
        </>
    )
}

export default BoxAddress;