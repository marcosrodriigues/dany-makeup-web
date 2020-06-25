import React from 'react';

import './style.css';
import Header from '../../components/Header/Index';
import FormBanner from '../../components/FormBanner/Index';

const NewBanner = () => {
    return (
        <div className="page">
            <Header current="banners" />

            <div className="container">
                <div className="content">
                    <div className="row">
                        <div className="header">
                            <h1 className="header-title">Novo banner</h1>
                        </div>
                    </div>
                    <div className="box-product-horizontal">
                        <FormBanner />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewBanner;