import React from 'react';

const BoxDelivery = ({
    delivery
}) => {
    return (
        !delivery ? <></> : 
        <>
            <div>
                <h4>Entrega: </h4>
            </div>

            <label className="col-form-label col-sm-4">Tipo de entrega</label>
            <label className="col-form-label col-sm-8 right">{delivery.name}</label>

            {
                delivery.code === '1' ? 
                    <>
                        <label className="col-form-label col-sm-4">Retirar na loja</label>
                        <label className="col-form-label col-sm-8 right">{delivery.store.name}</label>
                    </>

                :
                <>
                    <label className="col-form-label col-sm-4">Entrega em até</label>
                    <label className="col-form-label col-sm-8 right">{delivery.deadline} dias úteis</label>

                    <label className="col-form-label col-sm-4">CEP da entrega</label>
                    <label className="col-form-label col-sm-8 right">{delivery.cep || 'INDISPONÍVEL'}</label>

                    <label className="col-form-label col-sm-4">Valor</label>
                    <label className="col-form-label col-sm-8 right">R$ {delivery.value.replace('.', ',')}</label>   
                </>
            }
        </>
    )
}

export default BoxDelivery;