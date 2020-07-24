import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Index';

import './style.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './style.css';
import api from '../../services/api';

import CustomTable from '../../components/CustomTable/Index';
import BoxFilter from '../../components/BoxFilter/Index';
import IStore from '../../interface/IStore';

const Stores = () => {
    const [stores, setStores] = useState<IStore[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limitPerPage, setLimitPerPage] = useState<number>(5);
    const [count, setCount] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const [start, setStart] = useState<number>(0);
    const [end, setEnd] = useState<number>(5);

    const [inputSearch, setInputSearch] = useState<string>("");

    const [dataTable, setDataTable] = useState<any[]>([]);

    useEffect(() => {
        init();
        console.log(process.env.REACT_APP_DANY_MAKEUP_API || 'http://192.168.2.14:3333');
    }, [currentPage, limitPerPage]);

    async function init() {
        const params = {
            name: inputSearch,
            page: currentPage,
            limit: limitPerPage
        };

        api.get('stores', { params }).then(async response => {
            const { data } = response;

            setStores(data);
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
        let tables : any[] = [];

        stores.map(store => {
            const n : any = {
                id: store.id,
                image_url: store.image_url,
                name: store.name,
                description: store.description
            };
            tables.push(n);
            return store;
        })

        setDataTable(tables);
    }, [stores])

    function handleSubmitFilterForm(event) {
        event.preventDefault();
        init();
    }

    function handleChangeLimitPerPage(event) {
        setLimitPerPage(Number(event.target.value));
    }

    function handlePageClick(page: number) {
        setCurrentPage(page);
    }

    return (
        <div className="page">
            <Header current="lojas" />

            <div className="container">
                <div className="content">
                    <div className="header">
                        <h1 className="header-title">Lojas</h1>
                        <div className="search">
                            <Button variant="dark"><Link className="custom-link" to="/lojas/novo" >Nova loja</Link></Button>
                        </div>
                    </div>
                    
                    <div className="box-filter bg-dark">
                        <BoxFilter
                            limitPerPage={limitPerPage}
                            onChangeLimitPerPage={handleChangeLimitPerPage}
                            onSubmit={handleSubmitFilterForm}
                            fieldProps={[{
                                name: 'Nome',
                                value: inputSearch,
                                setValue: setInputSearch
                            }]}
                        />
                    </div>

                    <div className="box-table table-responsive">
                        <p className="right">
                            Exibindo de {start} até {end} de {count} registros no total.
                        </p>

                        <CustomTable
                            headers={["#", "Imagem", "Nome", "Descrição"]}
                            array={dataTable}
                            route="lojas"
                            routeApi="stores"
                            onRemove={init}
                            paginationProps={{ 
                                click: handlePageClick, 
                                offset, 
                                limitPerPage, 
                                currentPage, 
                                count
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stores;
