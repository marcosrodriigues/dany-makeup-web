import React from 'react';

import './style.css';
import Header from '../../components/Header/Index';
import FormStore from '../../components/FormStore/Index';

const NewStore = () => {
    return (
        <div className="page">
            <Header current="lojas" />

            <div className="container">
                <div className="content">
                    <div className="row">
                        <div className="header">
                            <h1 className="header-title">Nova loja</h1>
                        </div>
                    </div>
                    <div className="box-product-horizontal">
                        <FormStore />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewStore;