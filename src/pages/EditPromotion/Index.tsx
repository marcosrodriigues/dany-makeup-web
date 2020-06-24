import React, { useState, useEffect } from 'react';

import Header from '../../components/Header/Index';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import FormPromotion from '../../components/FormPromotion/Index';
import IPromotion from '../../interface/IPromotion';

const EditPromotion = () => {
    const { id } = useParams();

    const [promotion, setPromotion] = useState({} as IPromotion);
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (id) {
            try {
                api.get(`promotions/${id}`).then(response => {
                    const { 
                        promotion, 
                        products, 
                        images 
                    } = response.data;

                    setPromotion(promotion);
                    setProducts(products);
                    setImages(images);
                })
            } catch (err) {
                alert('Não foi possível carregar o produto');
                throw err;
            }
        }
    }, [id])

    return (
        <div className="page">
            <Header />

            <div className="container">
                <div className="content">
                    <div className="row">
                        <div className="header">
                            <h1 className="header-title">Editar promoção</h1>
                        </div>
                    </div>
                    <div className="box-product-horizontal">
                        <FormPromotion
                            promotion={promotion}
                            promotionProducts={products}
                            promotionImages={images}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPromotion;