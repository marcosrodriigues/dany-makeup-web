import React from 'react';

const BoxPayment = ({
    transaction
}) => {
    return (
        !transaction ? <></> : 
        <>
            <div>
                <h4>Pagamento: </h4>
            </div>

            <label className="col-form-label col-sm-6">Situação:</label>
            <label className="col-form-label col-sm-6 right">{transaction.status}</label>

            <label className="col-form-label col-sm-6">Pagamento via</label>
            <label className="col-form-label col-sm-6 right">{transaction.payment_method}</label>

            <label className="col-form-label col-sm-6">Valor pago</label>
            <label className="col-form-label col-sm-6 right">R$ {(transaction.amount / 100).toFixed(2).replace('.', ',')}</label>

            <label className="col-form-label col-sm-6">Código de autorização</label>
            <label className="col-form-label col-sm-6 right">{transaction.authorization_code}</label>
        </>
    )
}

export default BoxPayment;