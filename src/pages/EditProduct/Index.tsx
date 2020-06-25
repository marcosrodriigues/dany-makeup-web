import React, { useState, useEffect } from 'react';

import Header from '../../components/Header/Index';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import FormProduto from '../../components/FormProduct/Index';
import IProduct from '../../interface/IProduct';
import ICategory from '../../interface/ICategory';
import IProductImages from '../../interface/IProductImages';

const EditProduct = () => {
    const { id } = useParams();

    const [product, setProduct] = useState<IProduct>({} as IProduct);
    const [categorys, setCategorys] = useState<ICategory[]>([]);
    const [images, setImages] = useState<IProductImages[]>([]);

    useEffect(() => {
        if (id) {
            try {
                api.get(`products/${id}`).then(response => {
                    const { 
                        product, 
                        categorys, 
                        images 
                    } = response.data;
    
                    setProduct(product);
                    setCategorys(categorys);
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
            <Header current="produtos" />

            <div className="container">
                <div className="content">
                    <div className="row">
                        <div className="header">
                            <h1 className="header-title">Editar produto</h1>
                        </div>
                    </div>
                    <div className="box-product-horizontal">
                        <FormProduto 
                            product={product} 
                            categorys={categorys}
                            images={images}    
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProduct;