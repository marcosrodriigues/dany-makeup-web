import React from 'react';

const BoxUser = ({
    user
}) => {
    return (
        !user ? <></> : 
        <>
            <div>
                <h4>Cliente: </h4>
            </div>

            <label className="col-form-label col-sm-4">Nome</label>
            <label className="col-form-label col-sm-8 right">{user.name}</label>

            <label className="col-form-label col-sm-4">E-mail: </label>
            <label className="col-form-label col-sm-8 right">{user.email}</label>

            <label className="col-form-label col-sm-4">WhatsApp: </label>
            <label className="col-form-label col-sm-8 right">{user.whatsapp}</label>
        </>
    )
}

export default BoxUser;