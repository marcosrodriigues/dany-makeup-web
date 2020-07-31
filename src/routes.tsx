import React, { useState } from 'react';

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
import Login from './pages/Login/Index';
import EditOrder from './pages/EditOrder/Index';

import InputMask from 'react-input-mask';
import api from './services/api';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Login} path="/" exact />
                <Route component={Home} path="/dashboard" exact />
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
                <Route component={EditOrder} path="/pedidos/:id" exact />
                <Route component={DefaultFrete} path="/frete" />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;

const DefaultFrete = () => {
    const [cep, setCep] = useState('');
    const [name, setName] = useState('');
    const [fretes, setFretes] = useState([] as any[]);
    const [loading, isLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        isLoading(true)
        try {
            const { data } = await api.get('correios/frete', { params: {cep}})
            const nFrete: any = {
                cep,
                name,
                fretes: [
                    ...data
                ]
            }
            setFretes([
                ...fretes,
                nFrete
            ]);
        } catch (err) {
            alert(`ERROR ${err}`);
            console.log('ERRO BUSCA CEP', err)
        }
        isLoading(false);
    }

    return (
        <div className="col-sm-6 box">
            <form onSubmit={handleSubmit}>
                <div className="row">   
                    <label htmlFor="CEP" className="form-label col-form-label col-sm-1" >CEP: </label>
                    <div className=" col-sm-4">
                        <InputMask 
                            mask="99999-999"
                            id="cep"
                            className="form-control"
                            name="cep"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                        />
                    </div>

                    <label htmlFor="name" className="form-label col-form-label col-sm-1">Nome: </label>
                    <div className="col-sm-4">
                        <input type="text"
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">CALCULAR</button>
                </div>
            </form>

            {
                loading ? <div className="box">CARREGANDO</div> : 
                fretes.length > 0 &&
                    fretes.map(frete => (
                        <div className="col-sm-12 box">
                            <label className="form-label col-form-label col-sm-6" ><strong>{frete.name}</strong></label>
                            <label className="form-label col-form-label col-sm-6 right" >{frete.cep}</label>

                            {frete.fretes.map(f => (
                                <div className='row'>
                                    <div className="col-sm-12 box">
                                        <label className="form-label col-form-label col-sm-6" ><strong>SERVIÇO</strong></label>
                                        <label className="form-label col-form-label col-sm-6 right" >{f.name}</label>

                                        <label className="form-label col-form-label col-sm-6" ><strong>VALOR</strong></label>
                                        <label className="form-label col-form-label col-sm-6 right" >R$ {f.value.toFixed(2).replace('.',',')}</label>

                                        <label className="form-label col-form-label col-sm-6" ><strong>PRAZO</strong></label>
                                        <label className="form-label col-form-label col-sm-6 right" >{f.deadline} dias úteis</label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
            }
        </div>
    )
}

