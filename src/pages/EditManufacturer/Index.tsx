import React, { useState, useEffect } from 'react';

import Header from '../../components/Header/Index';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import IManufacturer from '../../interface/IManufacturer';
import FormManufacturer from '../../components/FormManufacturer/Index';

const EditManufacturer = () => {
    const { id } = useParams();

    const [manufacturer, setManufacturer] = useState<IManufacturer>({} as IManufacturer);

    useEffect(() => {
        if (id) {
            api.get(`manufacturers/${id}`).then(response => {
                setManufacturer(response.data);
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
                            <h1 className="header-title">Editar fabricante</h1>
                        </div>
                    </div>
                    <div className="box-product-horizontal">
                        <FormManufacturer manufacturer={manufacturer} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditManufacturer;