import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './pages/Home/Index';
import Products from './pages/Products/Index';
import NewProduct from './pages/NewProduct/Index';
import Categorys from './pages/Categorys/Index';
import NewCategory from './pages/NewCategory/Index';
import EditCategory from './pages/EditCategory/Index';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Home} path="/" exact />
                <Route component={Products} path="/produtos" exact />
                <Route component={NewProduct} path="/produtos/novo" exact />
                <Route component={Categorys} path="/categorias" exact />
                <Route component={NewCategory} path="/categorias/novo" exact  />
                <Route component={EditCategory} path="/categorias/:id" exact />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
