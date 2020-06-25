import React from 'react';
import Header from '../../components/Header/Index';

import './style.css';
import FormProduct from '../../components/FormProduct/Index';

const NovoProduto = () => {
    return (
        <div className="page">
            <Header current="produtos" />

            <div className="container">
                <div className="content">
                    <div className="row">
                        <div className="header">
                            <h1 className="header-title">Novo produto</h1>
                        </div>
                    </div>
                    <div className="box-product-horizontal">
                        <FormProduct />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NovoProduto;