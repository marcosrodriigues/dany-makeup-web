import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Index';

import './style.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './style.css';
import api from '../../services/api';
import IManufacturer from '../../interface/IManufacturer';

import CustomTable from '../../components/CustomTable/Index';
import IDataTableManufacturer from '../../interface/IDataTableManufacturers';
import BoxFilter from '../../components/BoxFilter/Index';

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
        init();
    }, [searchNome, currentPage, limitPerPage]);

    useEffect(() => {
        console.log(currentPage)
    }, [currentPage])

    async function init() {
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
    }

    useEffect(() => {
        setStart(offset + 1)
        setEnd(offset + limitPerPage < count ? offset + limitPerPage : count);
    }, [offset, limitPerPage, count])

    useEffect(() => {
        let nPages = Math.ceil(count / limitPerPage);
        let newCurrentPage = (currentPage > nPages && nPages > 0) ? nPages  : currentPage
        setCurrentPage(newCurrentPage);
    }, [limitPerPage])

    useEffect(() => {
        let tables : IDataTableManufacturer[] = [];

        manufacturers.map(manufacturer => {
            let qtd_produtos = manufacturer.qtd_produtos ? manufacturer.qtd_produtos : 0;
            const n : IDataTableManufacturer = {
                id: manufacturer.id,
                image_url: manufacturer.image_url,
                name: manufacturer.name,
                qtd_produtos: qtd_produtos
            };
            tables.push(n);
            return manufacturer;
        })

        setDataTable(tables);
    }, [manufacturers])

    function handleSubmitFilterForm(event) {
        event.preventDefault();
        setSearchNome(inputSearch);
    }

    function handleChangeLimitPerPage(event) {
        setLimitPerPage(Number(event.target.value));
    }

    function handlePageClick(page: number) {
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
                        <BoxFilter
                            limitPerPage={limitPerPage}
                            onChangeLimitPerPage={handleChangeLimitPerPage}
                            onSubmit={handleSubmitFilterForm}
                            fieldProps={[{
                                name: 'name',
                                value: inputSearch,
                                setValue: setInputSearch
                            }]}
                        />
                    </div>

                    <p className="right">
                        Exibindo de {start} até {end} de {count} registros no total.
                    </p>

                    <div className="box-table table-responsive">
                        <CustomTable
                            headers={["#", "Imagem", "Fabricante", "Nº Produtos"]}
                            array={dataTable}
                            route="fabricantes"
                            routeApi="manufacturers"
                            onRemove={init}
                            paginationProps={{ click: handlePageClick, offset, limitPerPage, currentPage, count}}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Manufacturers;
