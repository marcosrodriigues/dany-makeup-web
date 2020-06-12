import React, { useState, useEffect } from 'react';

import Header from '../../components/Header/Index';
import FormCategory from '../../components/FormCategory/Index';
import { useParams } from 'react-router-dom';
import ICategory from '../../interface/ICategory';
import api from '../../services/api';

const EditCategory = () => {
    const { id } = useParams();

    const [category, setCategory] = useState<ICategory>({} as ICategory);

    useEffect(() => {
        if (id) {
            api.get(`categorys/${id}`).then(response => {
                setCategory(response.data);
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
                            <h1 className="header-title">Editar categoria</h1>
                        </div>
                    </div>
                    <div className="box-product-horizontal">
                        <FormCategory category={category} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCategory;