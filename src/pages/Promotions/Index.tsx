import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Index';

import './style.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './style.css';
import BoxFilter from '../../components/BoxFilter/Index';
import CustomTable from '../../components/CustomTable/Index';
import api from '../../services/api';
import CounterRegister from '../../components/CounterRegister/Index';

const Promotions = () => {
    const [promotions, setPromotions] = useState<any[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limitPerPage, setLimitPerPage] = useState<number>(5);
    const [count, setCount] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const [start, setStart] = useState<number>(0);
    const [end, setEnd] = useState<number>(5);

    const [inputSearch, setInputSearch] = useState("");
    const [dataTable, setDataTable] = useState([]);

    useEffect(() => {
        console.log('mudou', currentPage, limitPerPage)
        init();
    }, [currentPage, limitPerPage]);

    async function init() {
        const params = {
            name: inputSearch,
            page: currentPage,
            limit: limitPerPage
        };

        const response = await api.get('promotions', { params });
        const data = response.data;

        setPromotions(data);
        setCount(Number(response.headers["x-total-count"]));
        setOffset(limitPerPage * (currentPage - 1));
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

        promotions && promotions.map(({ promotion, products }) => {
            const data = {
                id: promotion.id,
                image: promotion.image_url,
                name: promotion.name,
                products: products.map(prod => prod.name).join(', '),
                originalValue: promotion.originalValue,
                promotionValue: promotion.promotionValue,
            }

            tables.push(data);
        })
        setDataTable(tables);
    }, [promotions]);

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
            <Header current="promocoes" />

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
                            fieldProps={[{
                                name: 'Nome da promoção ou de produtos',
                                value: inputSearch,
                                setValue: setInputSearch
                            }]}
                        />
                    </div>

                    <CounterRegister start={start} end={end} count={count} />

                    <div className="box-table table-responsive">
                        <CustomTable
                            headers={['#', 'Imagem', 'Nome', 'Produtos', 'R$ Original', 'R$ Promocional']}
                            route='promocoes'
                            routeApi='promotions'
                            onRemove={init}
                            array={dataTable}
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

export default Promotions;
