import React, { useState, useEffect } from 'react';

import Header from '../../components/Header/Index';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import FormOrder from '../../components/FormOrder/Index';

const EditOrder = () => {
    const { id } = useParams();

    const [order, setOrder] = useState();

    useEffect(() => {
        (async function init() {
            if (!id) return;
            try {
                const { data } = await api.get(`orders/${id}`);
                setOrder(data);
                console.log(data);
            } catch (error) {
                console.log('ERROR LOAD ORDER', error);
                alert('Erro ao carregar pedido\n' + error)
            }
        })()
    }, [id])

    return (
        <div className="page">
            <Header current="pedidos" />

            <div className="container">
                <div className="content">
                    <div className="row">
                        <div className="header">
                            <h1 className="header-title">Editar pedido</h1>
                        </div>
                    </div>
                    <div className="box-product-horizontal">
                        <FormOrder form_order={order}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditOrder;