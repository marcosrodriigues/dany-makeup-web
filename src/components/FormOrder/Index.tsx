import React, { useState, useEffect } from 'react';
import BoxResume from './BoxResume';
import BoxDelivery from './BoxDelivery'
import BoxUser from './BoxUser';
import BoxAddress from './BoxAddress';
import BoxItems from './BoxItems';
import BoxPayment from './BoxPayment';

const FormOrder = ({
    form_order
}) => {
    const [order, setOrder] = useState({} as any);

    const [delivery, setDelivery] = useState({} as any)
    const [address, setAddress] = useState({} as any)
    const [resume, setResume] = useState({} as any)
    const [transaction, setTransaction] = useState({} as any)
    const [user, setUser] = useState({} as any)
    const [items, setItems] = useState([] as any[])

    useEffect(() => {
        if (form_order?.id) setOrder(form_order);
    }, [form_order])

    useEffect(() => {
        setAddress(order.address);
        setDelivery(order.delivery);
        setResume(order.resume);
        setTransaction(order.transaction);
        setUser(order.user);
        setItems(order.items);
    }, [order]);

    return (
        !order.id ? <></> : 
        <div className="">
            <div className="row box">
                <div className="col-sm-4 box">
                    <div>
                        <h4>Pedido: </h4>
                    </div>
                    <label className="col-form-label col-sm-4">Pedido</label>
                    <label className="col-form-label col-sm-8 right">#{order.id}</label>

                    <label className="col-form-label col-sm-4">Data</label>
                    <label className="col-form-label col-sm-8 right">
                        {(order?.created_at?.replace('T', ' '))}
                    </label>

                    <label className="col-form-label col-sm-4">Preço</label>
                    <label className="col-form-label col-sm-8 right">R$ {order.price}</label>
                </div>
                
                <div className="col-sm-5 box">
                    <BoxUser user={user} />
                    
                </div>
                <div className="col-sm-3 box">
                    <BoxResume resume={resume} />
                </div>
            </div>
            <div className="row box">
                <div className="col-sm-6 box">
                    <BoxDelivery delivery={delivery} />
                </div>
                <div className="col-sm-6 box">
                    <BoxAddress address={address} />
                </div>
            </div>
            <div className="row box">
                <div className="col-sm-6 box">
                    <BoxItems items={items} />
                </div>
                <div className="col-sm-6 box">
                    <BoxPayment transaction={transaction} />
                </div>
            </div>
        </div>
    )
}

export default FormOrder;