import React from 'react';

const BoxItems = ({
    items
}) => {
    return (
        !items ? <></> : 
        <>
            <div>
                <h4>Items: </h4>
            </div>

            {
                items.map(item => (
                    <div className="row box" key={item.id}>
                        <div className="col-sm-4">
                            <img src={item.image_url} alt={item.nam} width="150" />
                        </div>
                        <div className="col-sm-8">
                            <label className="col-form-label col-sm-6">{item.type}</label>
                            <label className="col-form-label col-sm-6 right">{item.name}</label>
                            <label className="col-form-label col-sm-12">{item.description}</label>
                            <label className="col-form-label col-sm-6">{item.quantity} x {item.unit_price}</label>
                            <label className="col-form-label col-sm-6 right">R$ {(item.quantity * item.unit_price).toFixed(2).replace('.', ',')}</label>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default BoxItems;