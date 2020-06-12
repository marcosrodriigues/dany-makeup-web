import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Index';

import './style.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './style.css';
import ICategory from '../../interface/ICategory';
import api from '../../services/api';

import { FaEdit} from 'react-icons/fa';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const Categorys = () => {
    const [categorys, setCategorys] = useState<ICategory[]>([]);

    useEffect(() => {
        reload();
    }, []);

    function reload() {
        setCategorys([]);
        api.get('categorys').then(response => {
            const categorias = response.data;
            console.log(categorias);
            setCategorys(categorias);
        });
    }

    async function handleRemoveButton(category_id: number) {
        await api.delete(`categorys/${category_id}`);
        reload();
    }

    return (
        <div className="page">
            <Header />

            <div className="container">
                <div className="content">
                    <div className="header">
                        <h1 className="header-title">Categorias</h1>
                        <div className="search">
                            <Button variant="dark"><Link className="custom-link" to="/categorias/novo" >Nova categoria</Link></Button>
                        </div>
                    </div>

                    <div className="box-table table-responsive">
                        <table className="table table-dark table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope='col' className="table-id">#</th>
                                    <th scope='col' className="table-image">Imagem</th>
                                    <th scope='col' className="table-title">Titulo</th>
                                    <th scope='col' className="table-qtd">Nº produtos</th>
                                    <th scope='col' className="table-options">Opções</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                categorys.length > 0 ?
                                    categorys.map(cat => (
                                    <tr key={cat.id}>
                                        <th scope="row">{cat.id}</th>
                                        <td>
                                            <img src={cat.image_url} alt={cat.title} width="100%" height="120" />
                                        </td>
                                        <td>{cat.title}</td>
                                        <td>10</td>
                                        <td className="td-options">
                                            <button type="button" className="btn btn-dark">
                                                <Link to={`/categorias/${cat.id}`} className="custom-link" >
                                                    <FaEdit size={18} />
                                                </Link>
                                            </button>
                                            <button type="button" onClick={() => handleRemoveButton(cat.id)} className="btn btn-dark custon-link">
                                                <IoIosCloseCircleOutline className="custom-link" size={24} />
                                            </button>
                                        </td>
                                    </tr>
                                    ))
                                :
                                    <tr>
                                        <td colSpan={5} className="centered">Nenhuma categoria cadastrada.</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categorys;
