import React, { useState } from 'react';
import Header from '../../components/Header/Index';

import './style.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './style.css';
import BoxFilter from '../../components/BoxFilter/Index';

const Promotions = () => {
    const [promotions, setPromotions] = useState([]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limitPerPage, setLimitPerPage] = useState<number>(5);
    const [count, setCount] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const [start, setStart] = useState<number>(0);
    const [end, setEnd] = useState<number>(5);

    const [dataTable, setDataTable] = useState([]);

    function handleSubmitFilterForm(event) {
        event.preventDefault();
        //init();
    }

    function handleChangeLimitPerPage(event) {
        setLimitPerPage(Number(event.target.value));
    }

    return (
        <div className="page">
            <Header />

            <div className="container">
                <div className="content">
                    <div className="header">
                        <h1 className="header-title">Promoções</h1>
                        <div className="search">
                            <Button variant="dark"><Link className="custom-link" to="/promocoes/novo" >Nova promoção</Link></Button>
                        </div>
                    </div>

                    <div className="box-filter bg-dark">
                        <BoxFilter
                            limitPerPage={limitPerPage}
                            onChangeLimitPerPage={handleChangeLimitPerPage}
                            onSubmit={handleSubmitFilterForm}
                            fieldProps={[{}]}
                        />
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
                                promotions.length > 0 ?
                                    promotions.map(({ promotion }) => (
                                        <div></div>
                                    // <tr key={promotion?.id}>
                                    //     <th scope="row">{promotion?.id}</th>
                                    //     <td>
                                    //         <img src={promotion?.mainImage} alt={promotion?.name} width="100%" height="120" />
                                    //     </td>
                                    //     <td>{promotion?.name}</td>
                                    //     <td>
                                    //         coisa
                                    //     </td>
                                    //     <td>R$ {promotion?.value}</td>
                                    //     <td className="td-options">
                                    //         <button type="button" className="btn btn-dark">
                                    //             <Link to={`/promocoes/${promotion?.id}`} className="custom-link" >
                                    //                 <FaEdit size={18} />
                                    //             </Link>
                                    //         </button>
                                    //         <button type="button" onClick={() => console.log("foi")} className="btn btn-dark custon-link">
                                    //             <IoIosCloseCircleOutline className="custom-link" size={24} />
                                    //         </button>
                                    //     </td>
                                    // </tr>
                                    ))
                                :
                                    <tr key="no-product">
                                        <td colSpan={6} className="centered">Nenhuma promoção cadastrado.</td>
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

export default Promotions;
