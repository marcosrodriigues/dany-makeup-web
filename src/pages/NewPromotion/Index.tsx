import React from 'react';

import './style.css';
import Header from '../../components/Header/Index';
import FormPromotion from '../../components/FormPromotion/Index';

const NewPromotion = () => {
    return (
        <div className="page">
            <Header current="promocoes" />

            <div className="container">
                <div className="content">
                    <div className="row">
                        <div className="header">
                            <h1 className="header-title">Nova promoção</h1>
                        </div>
                    </div>
                    <div className="box-product-horizontal">
                        <FormPromotion />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewPromotion;