import React from 'react';

const BoxResume = ({
    resume
}) => {
    return (
        !resume ? <></> : 
        <>
            <div>
                <h4>Resumo: </h4>
            </div>
            
            <label className="col-form-label col-sm-4">Subtotal</label>
            <label className="col-form-label col-sm-8 right">R$ {resume.subtotal.replace('.', ',')}</label>
                
            <label className="col-form-label col-sm-4">Frete</label>
            <label className="col-form-label col-sm-8 right">R$ {resume.frete.replace('.', ',')}</label>
                
            <label className="col-form-label col-sm-4">Total</label>
            <label className="col-form-label col-sm-8 right">R$ {resume.total.replace('.', ',')}</label>
        </>
    )
}

export default BoxResume;