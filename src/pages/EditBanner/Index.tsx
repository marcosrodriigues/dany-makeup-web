import React, { useState, useEffect } from 'react';

import Header from '../../components/Header/Index';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import FormBanner from '../../components/FormBanner/Index';

const EditBanner = () => {
    const { id } = useParams();

    const [banner, setBanner] = useState();

    useEffect(() => {
        if (id) {
            api.get(`banners/${id}`).then(response => {
                const data = response.data;
                setBanner(data);
            })
        }
    }, [id])

    return (
        <div className="page">
            <Header />

            <div className="container">
                <div className="content">
                    <div className="row">
                        <div className="header">
                            <h1 className="header-title">Editar banner</h1>
                        </div>
                    </div>
                    <div className="box-product-horizontal">
                        <FormBanner banner={banner} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditBanner;