import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Index';

import './style.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './style.css';
import api from '../../services/api';
import IPropsFormProduct from '../../interface/IPropsFormProduto';
import BoxFilter from '../../components/BoxFilter/Index';
import CustomTable from '../../components/CustomTable/Index';

const Produtos = () => {
    const [products, setProducts] = useState<IPropsFormProduct[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limitPerPage, setLimitPerPage] = useState<number>(5);
    const [count, setCount] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const [start, setStart] = useState<number>(0);
    const [end, setEnd] = useState<number>(5);

    const [searchInput, setSearchInput] = useState<string>("");
    const [dataTable, setDataTable] = useState([]);

    useEffect(() => {
        init();
    }, [currentPage, limitPerPage]);


    function init() {
        const params = {
            name: searchInput,
            page: currentPage,
            limit: limitPerPage
        }

        api.get('products', { params }).then(async response => {
            const { data } = response;

            setProducts(data);
            setCount(Number(response.headers["x-total-count"]));
            setOffset(limitPerPage * (currentPage - 1));
        });
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
        let tables: any = [];

        products && products.map(({product, categorys}) => {
            const categorias = categorys?.map(cat => {
                return cat.title
            })
            const n = {
                id: product?.id,
                image_url: product?.mainImage,
                name: product?.name,
                manufacturer: product?.manufacturer.name,
                categorys: categorias?.join(', ')
            };
            tables.push(n);
            return product;
        })

        setDataTable(tables);
    }, [products])

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
            <Header current="produtos" />

            <div className="container">
                <div className="content">
                    <div className="header">
                        <h1 className="header-title">Produtos</h1>
                        <div className="search">
                            <Button variant="dark"><Link className="custom-link" to="/produtos/novo" >Novo produto</Link></Button>
                        </div>
                    </div>
                    
                    <div className="box-filter bg-dark">
                        <BoxFilter
                            limitPerPage={limitPerPage}
                            onChangeLimitPerPage={handleChangeLimitPerPage}
                            onSubmit={handleSubmitFilterForm}
                            fieldProps={[{
                                name: 'Nome e descrição',
                                value: searchInput,
                                setValue: setSearchInput
                            }]}
                        />
                    </div>

                    <p className="right">
                        Exibindo de {start} até {end} de {count} registros no total.
                    </p>

                    <div className="box-table table-responsive">
                        <CustomTable
                            headers={["#", "Imagem", "Nome", "Fabricante", "Categoria"]}
                            array={dataTable}
                            route="produtos"
                            routeApi="products"
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

export default Produtos;
