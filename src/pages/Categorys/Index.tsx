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

const Categorys = () => {
    const [categorys, setCategorys] = useState<ICategory[]>([]);

    const [searchTitle, setSearchTitle] = useState("");

    const [pagination, setPagination] = useState({
        currentPage: 1,
        limitPerPage: 5,
        count: 0,
        offset: 0,
        start: 0,
        end: 0
    });

    const [dataTable, setDataTable] = useState<{ id, image_url, name, qtd_produtos }[]>([]);

    useEffect(() => {
        init();
    }, [pagination.currentPage, pagination.limitPerPage]);

    useEffect(() => {
        setPagination({
            ...pagination,
            start: pagination.offset + 1,
            end: pagination.offset + pagination.limitPerPage < pagination.count ? pagination.offset + pagination.limitPerPage : pagination.count
        })
    }, [pagination.offset, pagination.limitPerPage, pagination.count])

    useEffect(() => {
        let current = Math.ceil(pagination.count / pagination.limitPerPage);
        if (current < 1) current = 1;
        setPagination({
            ...pagination,
            currentPage: current
        })
    }, [pagination.limitPerPage])

    useEffect(() => {
        let tables : any = [];

        console.log(categorys);
        categorys && categorys.map(category => {
            let qtd_produtos = category.qtd_produtos ? category.qtd_produtos : 0;
            const n = {
                id: category.id,
                image_url: category.image_url,
                name: category.title,
                qtd_produtos: qtd_produtos
            };
            tables.push(n);
            return category;
        })

        setDataTable(tables);
    }, [categorys])

    async function init() {
        const params = {
            title: searchTitle,
            page: pagination.currentPage,
            limit: pagination.limitPerPage
        }

        const response = await api.get('categorys', { params })
        const categorias = response.data;

        setCategorys(categorias);
        setPagination({
            ...pagination,
            count: Number(response.headers['x-total-count']),
            offset: (pagination.limitPerPage * (pagination.currentPage - 1))
        });
    }

    function handleSubmitFilterForm(event) {
        event.preventDefault();
        init();
    }

    function handleChangeLimitPerPage(event) {
        setPagination({
            ...pagination, 
            limitPerPage: Number(event.target.value)
        });
    }

    function handlePageClick(page: number) {
        setPagination({
            ...pagination, 
            currentPage: page
        });
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

                    <div className="box-filter bg-dark">
                        <BoxFilter
                            limitPerPage={pagination.limitPerPage}
                            onChangeLimitPerPage={handleChangeLimitPerPage}
                            onSubmit={handleSubmitFilterForm}
                            fieldProps={[{
                                name: 'Título',
                                value: searchTitle,
                                setValue: setSearchTitle
                            }]}
                        />
                    </div>

                    <p className="right">
                        Exibindo de {pagination.start} até {pagination.end} de {pagination.count} registros no total.
                    </p>

                    <div className="box-table table-responsive">
                        <CustomTable
                            headers={["#", "Imagem", "Título", "Nº Produtos"]}
                            array={dataTable}
                            route="categorias"
                            routeApi="categorys"
                            onRemove={init}
                            paginationProps={{ 
                                click: handlePageClick, 
                                offset: pagination.offset, 
                                limitPerPage: pagination.limitPerPage,
                                currentPage: pagination.currentPage,
                                count: pagination.count}}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Categorys;
