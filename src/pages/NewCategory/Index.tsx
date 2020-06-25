import React from 'react';

import './style.css';
import Header from '../../components/Header/Index';
import FormCategory from '../../components/FormCategory/Index';

const NewCategory = () => {
    return (
        <div className="page">
            <Header current="categorias" />

            <div className="container">
                <div className="content">
                    <div className="row">
                        <div className="header">
                            <h1 className="header-title">Nova categoria</h1>
                        </div>
                    </div>
                    <div className="box-product-horizontal">
                        <FormCategory />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewCategory;