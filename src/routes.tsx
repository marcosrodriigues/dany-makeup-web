import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './pages/Home/Index';
import Products from './pages/Products/Index';
import NewProduct from './pages/NewProduct/Index';
import Categorys from './pages/Categorys/Index';
import NewCategory from './pages/NewCategory/Index';
import EditCategory from './pages/EditCategory/Index';
import EditProduct from './pages/EditProduct/Index';
import Promotions from './pages/Promotions/Index';
import Manufacturers from './pages/Manufacturers/Index';
import NewManufacturer from './pages/NewManufacturer/Index';
import EditManufacturer from './pages/EditManufacturer/Index';
import NewPromotion from './pages/NewPromotion/Index';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Home} path="/" exact />
                <Route component={Manufacturers} path="/fabricantes" exact />
                <Route component={NewManufacturer} path="/fabricantes/novo" exact  />
                <Route component={EditManufacturer} path="/fabricantes/:id" exact />
                <Route component={Categorys} path="/categorias" exact />
                <Route component={NewCategory} path="/categorias/novo" exact  />
                <Route component={EditCategory} path="/categorias/:id" exact />
                <Route component={Products} path="/produtos" exact />
                <Route component={NewProduct} path="/produtos/novo" exact />
                <Route component={EditProduct} path="/produtos/:id" exact />
                <Route component={Promotions} path="/promocoes" exact />
                <Route component={NewPromotion} path="/promocoes/novo" exact />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
