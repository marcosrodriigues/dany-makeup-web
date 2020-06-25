import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Index';

import './style.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './style.css';
import ICategory from '../../interface/ICategory';
import api from '../../services/api';

import BoxFilter from '../../components/BoxFilter/Index';
import CustomTable from '../../components/CustomTable/Index';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [limitPerPage, setLimitPerPage] = useState(5);
    const [count, setCount] = useState(0);
    const [offset, setOffset] = useState(0);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);    

    const [dataTable, setDataTable] = useState([]);

    useEffect(() => {
        init();
    }, [currentPage, limitPerPage]);

    useEffect(() => {
        setStart(offset + 1);
        setEnd(offset + limitPerPage < count ? offset + limitPerPage : count);
    }, [offset, limitPerPage, count])

    useEffect(() => {
        let nPages = Math.ceil(count / limitPerPage);
        let newCurrentPage = (currentPage > nPages && nPages > 0) ? nPages  : currentPage
        setCurrentPage(newCurrentPage);
    }, [limitPerPage])

    useEffect(() => {
        let tables : any = [];

        orders && orders.map((order: any) => {
            const n = {
                id: order.id,
                client: order.client,
                products: order.products,
                value: order.value
            };
            tables.push(n);
            return order;
        })

        setDataTable(tables);
    }, [orders])

    async function init() {
        const params = {
            search: search,
            page: currentPage,
            limit: limitPerPage
        }

        const response = await api.get('orders', { params })
        const orders = response.data;

        setOrders(orders)
        setCount(Number(response.headers['x-total-count']));
        setOffset(limitPerPage * (currentPage - 1));
    }

    function handleSubmitFilterForm(event) {
        event.preventDefault();
        init();
        setCurrentPage(1);
    }

    function handleChangeLimitPerPage(event) {
        setLimitPerPage(Number(event.target.value))
    }

    function handlePageClick(page: number) {
        setCurrentPage(page)
    }

    return (
        <div className="page">
            <Header current="pedidos" />

            <div className="container">
                <div className="content">
                    <div className="header">
                        <h1 className="header-title">Pedidos</h1>
                    </div>

                    <div className="box-filter bg-dark">
                        <BoxFilter
                            limitPerPage={limitPerPage}
                            onChangeLimitPerPage={handleChangeLimitPerPage}
                            onSubmit={handleSubmitFilterForm}
                            fieldProps={[{
                                name: 'Cliente, produto, categoria, fabricante...',
                                value: search,
                                setValue: setSearch
                            }]}
                        />
                    </div>

                    <p className="right">
                        Exibindo de {start} até {end} de {count} registros no total.
                    </p>

                    <div className="box-table table-responsive">
                        <CustomTable
                            headers={["#", "Cliente", "Produtos", "Valor"]}
                            array={dataTable}
                            route="pedidos"
                            routeApi="orders"
                            onRemove={init}
                            paginationProps={{ 
                                click: handlePageClick, 
                                offset: offset, 
                                limitPerPage: limitPerPage,
                                currentPage: currentPage,
                                count: count}}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Orders;
