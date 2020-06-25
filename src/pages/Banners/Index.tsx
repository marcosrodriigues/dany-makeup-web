import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Index';

import './style.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './style.css';
import api from '../../services/api';

import CustomTable from '../../components/CustomTable/Index';
import IDataTableManufacturer from '../../interface/IDataTableManufacturers';
import BoxFilter from '../../components/BoxFilter/Index';
import CounterRegister from '../../components/CounterRegister/Index';

const Banners = () => {
    const [banners, setBanners] = useState([]);

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
    }, [currentPage, limitPerPage]);

    async function init() {
        const params = {
            name: inputSearch,
            page: currentPage,
            limit: limitPerPage
        };

        api.get('banners', { params }).then(async response => {
            const { data } = response;

            setBanners(data);
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

        banners.map((banner: any) => {
            const ban = {
                id: banner.id,
                image_url: banner.image_url,
                name: banner.name,
                description: banner.description
            };
            tables.push(ban);
            return banner;
        })

        setDataTable(tables);
    }, [banners])

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
            <Header current="banners" />

            <div className="container">
                <div className="content">
                    <div className="header">
                        <h1 className="header-title">Banners</h1>
                        <div className="search">
                            <Button variant="dark"><Link className="custom-link" to="/banners/novo" >Novo banner</Link></Button>
                        </div>
                    </div>
                    
                    <div className="box-filter bg-dark">
                        <BoxFilter
                            limitPerPage={limitPerPage}
                            onChangeLimitPerPage={handleChangeLimitPerPage}
                            onSubmit={handleSubmitFilterForm}
                            fieldProps={[{
                                name: 'Nome e descrição',
                                value: inputSearch,
                                setValue: setInputSearch
                            }]}
                        />
                    </div>

                    <CounterRegister start={start} end={end} count={count} />

                    <div className="box-table table-responsive">
                        <CustomTable
                            headers={["#", "Imagem", "Nome", "Descrição"]}
                            array={dataTable}
                            route="banners"
                            routeApi="banners"
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

export default Banners;
