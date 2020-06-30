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
import EditPromotion from './pages/EditPromotion/Index';
import Banners from './pages/Banners/Index';
import NewBanner from './pages/NewBanner/Index';
import EditBanner from './pages/EditBanner/Index';
import Clients from './pages/Clients/Index';
import EditClient from './pages/EditClient/Index';
import Orders from './pages/Orders/Index';
import Stores from './pages/Stores/Index';
import NewStore from './pages/NewStore/Index';
import EditStore from './pages/EditStore/Index';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Home} path="/" exact />
                <Route component={Stores} path="/lojas" exact />
                <Route component={NewStore} path="/lojas/novo" exact  />
                <Route component={EditStore} path="/lojas/:id" exact />
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
                <Route component={EditPromotion} path="/promocoes/:id" exact />
                <Route component={Banners} path="/banners" exact />
                <Route component={NewBanner} path="/banners/novo" exact />
                <Route component={EditBanner} path="/banners/:id" exact />
                <Route component={Clients} path="/clientes" exact />
                <Route component={EditClient} path="/clientes/:id" exact />
                <Route component={Orders} path="/pedidos" exact />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;

