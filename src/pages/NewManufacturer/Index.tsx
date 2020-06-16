import React from 'react';

import './style.css';
import Header from '../../components/Header/Index';
import FormManufacturer from '../../components/FormManufacturer/Index';

const NewManufacturer = () => {
    return (
        <div className="page">
            <Header />

            <div className="container">
                <div className="content">
                    <div className="row">
                        <div className="header">
                            <h1 className="header-title">Novo fabricante</h1>
                        </div>
                    </div>
                    <div className="box-product-horizontal">
                        <FormManufacturer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewManufacturer;