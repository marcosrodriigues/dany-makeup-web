import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom'

import Home from './pages/Home/Index';
import Produtos from './pages/Products/Index';
import NovoProduto from './pages/NewProduct/Index';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={Produtos} path="/produtos" exact />
            <Route component={NovoProduto} path="/produtos/novo" exact />
        </BrowserRouter>
    )
}

export default Routes;
