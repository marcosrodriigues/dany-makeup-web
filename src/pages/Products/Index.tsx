import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Index';

import './style.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './style.css';
import api from '../../services/api';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { FaEdit } from 'react-icons/fa';
import IPropsFormProduct from '../../interface/IPropsFormProduto';

const Produtos = () => {
    const [products, setProducts] = useState<IPropsFormProduct[]>([]);

    useEffect(() => {
        reload();
    }, [])

    function reload() {
        api.get('products').then(response => {
            const { data } = response;
            console.log(data);
            setProducts(data);
        });
    }

    useEffect(() => {
        //console.log(products);
    }, [products])

    async function handleRemoveButton(product_id: number | undefined) {
        if (product_id) {
            await api.delete(`products/${product_id}`);
            reload();
        }
    }

    return (
        <div className="page">
            <Header />

            <div className="container">
                <div className="content">
                    <div className="header">
                        <h1 className="header-title">Produtos</h1>
                        <div className="search">
                            <Button variant="dark"><Link className="custom-link" to="/produtos/novo" >Novo produto</Link></Button>
                        </div>
                    </div>

                    <div className="box-table table-responsive">
                    <table className="table table-dark table-striped table-hover">
                            <thead>
                                <tr>
                                <th scope='col' className="table-id">#</th>
                                    <th scope='col' className="table-image">Imagem</th>
                                    <th scope='col' className="table-title">Produto</th>
                                    <th scope='col' className="table-category">Categorias</th>
                                    <th scope='col' className="table-value">Valor</th>
                                    <th scope='col' className="table-options">Opções</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                products.length > 0 ?
                                    products.map(({ product, categorys }) => (
                                    <tr key={product?.id}>
                                        <th scope="row">{product?.id}</th>
                                        <td>
                                            <img src={product?.mainImage} alt={product?.name} width="100%" height="120" />
                                        </td>
                                        <td>{product?.name}</td>
                                        <td>
                                            {   categorys?.map(cat => cat.title).join(', ')}
                                        </td>
                                        <td>R$ {product?.value}</td>
                                        <td className="td-options">
                                            <button type="button" className="btn btn-dark">
                                                <Link to={`/produtos/${product?.id}`} className="custom-link" >
                                                    <FaEdit size={18} />
                                                </Link>
                                            </button>
                                            <button type="button" onClick={() => handleRemoveButton(product?.id)} className="btn btn-dark custon-link">
                                                <IoIosCloseCircleOutline className="custom-link" size={24} />
                                            </button>
                                        </td>
                                    </tr>
                                    ))
                                :
                                    <tr key="no-product">
                                        <td colSpan={6} className="centered">Nenhum produto cadastrado.</td>
                                    </tr>
                                }
                            </tbody>
                        </table>

                        <nav>
                            <ul className="pagination justify-content-center dark">
                                <li className="page-item disabled">
                                    <a className="page-link" href="/" tabIndex={-1}>Previous</a>
                                </li>
                                <li className="page-item"><a className="page-link" href="/">1</a></li>
                                <li className="page-item"><a className="page-link" href="/">2</a></li>
                                <li className="page-item"><a className="page-link" href="/">3</a></li>
                                <li className="page-item">
                                <a className="page-link" href="/">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Produtos;
