import React, { useState, useEffect } from 'react';

import Header from '../../components/Header/Index';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import FormStore from '../../components/FormStore/Index';

const EditStore = () => {
    const { id } = useParams();

    const [store, setStore] = useState();

    useEffect(() => {
        if (id) {
            api.get(`stores/${id}`).then(response => {
                setStore(response.data);
            })
        }
    }, [id])

    return (
        <div className="page">
            <Header current="lojas" />

            <div className="container">
                <div className="content">
                    <div className="row">
                        <div className="header">
                            <h1 className="header-title">Editar lojas</h1>
                        </div>
                    </div>
                    <div className="box-product-horizontal">
                        <FormStore store={store} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditStore;