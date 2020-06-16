import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Index';

import './style.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './style.css';
import api from '../../services/api';
import { FaSearch } from 'react-icons/fa';
import IManufacturer from '../../interface/IManufacturer';

import CustomTable from '../../components/CustomTable/Index';
import IDataTableManufacturer from '../../interface/IDataTableManufacturers';

const Manufacturers = () => {
    const [manufacturers, setManufacturers] = useState<IManufacturer[]>([]);
    const [searchNome, setSearchNome] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limitPerPage, setLimitPerPage] = useState<number>(5);
    const [count, setCount] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const [start, setStart] = useState<number>(0);
    const [end, setEnd] = useState<number>(5);

    const [inputSearch, setInputSearch] = useState<string>("");

    const [dataTable, setDataTable] = useState<IDataTableManufacturer[]>([]);

    useEffect(() => {
        const params = {
            name: searchNome,
            page: currentPage,
            limit: limitPerPage
        };

        api.get('manufacturers', { params }).then(async response => {
            const { data } = response;

            setManufacturers(data);
            setCount(Number(response.headers["x-total-count"]));
            setOffset(limitPerPage * (currentPage - 1));
        })
    }, [searchNome, currentPage, limitPerPage]);

    useEffect(() => {
        setStart(offset + 1)
        setEnd(offset + limitPerPage < count ? offset + limitPerPage : count);
    }, [offset, limitPerPage, count])

    useEffect(() => {
        let tables : IDataTableManufacturer[] = [];

        manufacturers.map(manufacturer => {
            const n : IDataTableManufacturer = {
                id: manufacturer.id,
                image_url: manufacturer.image_url,
                name: manufacturer.name,
                qtd_produtos: 40,
            };
            tables.push(n);
            return;
        })

        setDataTable(tables);
    }, [manufacturers])

    function handleSubmitFilterForm(event) {
        event.preventDefault();
        setSearchNome(inputSearch);
    }

    function handleChangeSelect(event) {
        setLimitPerPage(Number(event.target.value));
    }

    function handlePageClick(page: number) {
        console.log(page);
        setCurrentPage(page);
    }

    return (
        <div className="page">
            <Header />

            <div className="container">
                <div className="content">
                    <div className="header">
                        <h1 className="header-title">Fabricantes</h1>
                        <div className="search">
                            <Button variant="dark"><Link className="custom-link" to="/fabricantes/novo" >Novo fabricante</Link></Button>
                        </div>
                    </div>
                    
                    <div className="box-filter bg-dark">
                        <fieldset>
                            <form onSubmit={handleSubmitFilterForm} className="form-inline centered">
                                <div className="centered w-100 row ml-0">
                                    <div className="col-sm-2">
                                        <span className="text-filter text-gold">Filtre por:</span>
                                    </div>
                                    <div className="col-sm-6">
                                        <input 
                                            id="name" 
                                            placeholder="Nome" 
                                            className="form-control bg-gold"
                                            onChange={event => setInputSearch(event.target.value)}
                                            value={inputSearch} />

                                    </div>
                                    <div className="col-sm-3">
                                        <select className="form-control bg-gold" value={limitPerPage} onChange={handleChangeSelect}>
                                            <option disabled>Exibir de:</option>
                                            <option value={5}>Exibir de 5 e 5</option>
                                            <option value={10}>Exibir de 10 em 10</option>
                                            <option value={15}>Exibir de 15 em 15</option>
                                            <option value={20}>Exibir de 20 em 20</option>
                                            <option value={25}>Exibir de 25 em 25</option>
                                            <option value={50}>Exibir de 50 em 50</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-1">
                                        <button type="submit" className="btn btn-dark right">
                                            <FaSearch></FaSearch>
                                        </button>
                                    </div>
                                    
                                </div>
                            </form>
                        </fieldset>
                    </div>

                    <p className="right">
                        Exibindo de {start} até {end} de {count} registros no total.
                    </p>

                    <div className="box-table table-responsive">
                        <CustomTable
                            headers={["#", "Imagem", "Fabricante", "Nº Produtos"]}
                            array={dataTable}
                            route="fabricantes"
                            paginationProps={{ click: handlePageClick, offset, limitPerPage, currentPage, count}}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Manufacturers;
