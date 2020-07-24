import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Index';

import './style.css';


import './style.css';
import api from '../../services/api';

import CustomTable from '../../components/CustomTable/Index';
import BoxFilter from '../../components/BoxFilter/Index';
import CounterRegister from '../../components/CounterRegister/Index';

const Clients = () => {
    const [clients, setClients] = useState([]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limitPerPage, setLimitPerPage] = useState<number>(5);
    const [count, setCount] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const [start, setStart] = useState<number>(0);
    const [end, setEnd] = useState<number>(5);

    const [inputSearch, setInputSearch] = useState<string>("");

    const [dataTable, setDataTable] = useState([]);

    useEffect(() => {
        init();
    }, [currentPage, limitPerPage]);

    async function init() {
        const params = {
            search: inputSearch,
            page: currentPage,
            limit: limitPerPage
        };

        api.get('users', { params }).then(async response => {
            const { data } = response;

            setClients(data);
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
        let tables : any = [];

        clients.map((client: any) => {
            const cli = {
                id: client.id,
                image: client.avatar,
                name: client.name,
                email: client.email,
                whatsapp: client.whatsapp
            };
            tables.push(cli);
            return client;
        })

        setDataTable(tables);
    }, [clients])

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
            <Header current="clientes" />

            <div className="container">
                <div className="content">
                    <div className="header">
                        <h1 className="header-title">Clientes</h1>
                    </div>
                    
                    <div className="box-filter bg-dark">
                        <BoxFilter
                            limitPerPage={limitPerPage}
                            onChangeLimitPerPage={handleChangeLimitPerPage}
                            onSubmit={handleSubmitFilterForm}
                            fieldProps={[{
                                name: 'Nome, email, whatsapp...',
                                value: inputSearch,
                                setValue: setInputSearch
                            }]}
                        />
                    </div>

                    <CounterRegister start={start} end={end} count={count} />

                    <div className="box-table table-responsive">
                        <CustomTable
                            headers={["#", "Imagem", "Nome", "Email", "Whatsapp"]}
                            array={dataTable}
                            route="clientes"
                            routeApi="users"
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

export default Clients;
