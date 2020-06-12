import React from 'react';
import Header from '../../components/Header/Index';

import './style.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './style.css';

const Categorys = () => {
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
                                    <th scope='col'>#</th>
                                    <th scope='col'>Imagem</th>
                                    <th scope='col'>Titulo</th>
                                    <th scope='col'>Opções</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Imagem</td>
                                    <td>Imagem</td>
                                    <td>Imagem</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Imagem</td>
                                    <td>Imagem</td>
                                    <td>Imagem</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* <nav>
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
                        </nav> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categorys;
