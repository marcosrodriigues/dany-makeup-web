import React from 'react';
import Header from '../../components/Header/Index';

import './style.css';
import FormProduto from '../../components/FormProduto/Index';

const NovoProduto = () => {
    return (
        <div className="page">
            <Header />

            <div className="container">
                <div className="content">
                    <div className="row">
                        <div className="header">
                            <h1 className="header-title">Novo produto</h1>
                        </div>
                    </div>
                    <div className="box-product-horizontal">
                        <FormProduto />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NovoProduto;