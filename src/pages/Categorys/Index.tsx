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

    //const [pagination, setPagination] = useState({
    const [currentPage, setCurrentPage] = useState(1);
    const [limitPerPage, setLimitPerPage] = useState(5);
    const [count, setCount] = useState(0);
    const [offset, setOffset] = useState(0);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);    //});

    const [dataTable, setDataTable] = useState<{ id, image_url, name, qtd_produtos }[]>([]);

    useEffect(() => {
        init();
    }, [currentPage, limitPerPage]);

    useEffect(() => {
        setStart(offset + 1);
        setEnd(offset + limitPerPage < count ? offset + limitPerPage : count);
    }, [offset, limitPerPage, count])

    useEffect(() => {
        let current = Math.ceil(count / limitPerPage);
        if (current < 1) current = 1;
        setCurrentPage(current)
    }, [limitPerPage])

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
            page: currentPage,
            limit: limitPerPage
        }

        const response = await api.get('categorys', { params })
        const categorias = response.data;

        setCategorys(categorias);
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
                            limitPerPage={limitPerPage}
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
                        Exibindo de {start} até {end} de {count} registros no total.
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

export default Categorys;
