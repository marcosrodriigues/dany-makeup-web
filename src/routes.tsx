import React, { useState } from 'react';

import { BrowserRouter, Route, Switch, HashRouter } from 'react-router-dom'

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
import GifLoading from './components/GifLoading/Index';

const Routes = () => {
    return (
        <HashRouter>
        <BrowserRouter>
            <Switch>
                <Route component={Login} path="/" exact />
                <Route component={Home} path="/dashboard"  />
                <Route component={Stores} path="/lojas"  />
                <Route component={NewStore} path="/lojas/novo"   />
                <Route component={EditStore} path="/lojas/:id"  />
                <Route component={Manufacturers} path="/fabricantes"  />
                <Route component={NewManufacturer} path="/fabricantes/novo"   />
                <Route component={EditManufacturer} path="/fabricantes/:id"  />
                <Route component={Categorys} path="/categorias"  />
                <Route component={NewCategory} path="/categorias/novo"   />
                <Route component={EditCategory} path="/categorias/:id"  />
                <Route component={Products} path="/produtos"  />
                <Route component={NewProduct} path="/produtos/novo"  />
                <Route component={EditProduct} path="/produtos/:id"  />
                <Route component={Promotions} path="/promocoes"  />
                <Route component={NewPromotion} path="/promocoes/novo"  />
                <Route component={EditPromotion} path="/promocoes/:id"  />
                <Route component={Banners} path="/banners"  />
                <Route component={NewBanner} path="/banners/novo"  />
                <Route component={EditBanner} path="/banners/:id"  />
                <Route component={Clients} path="/clientes"  />
                <Route component={EditClient} path="/clientes/:id"  />
                <Route component={Orders} path="/pedidos"  />
                <Route component={EditOrder} path="/pedidos/:id"  />
                <Route component={DefaultFrete} path="/frete" />
            </Switch>
        </BrowserRouter>
        </HashRouter>
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
                loading ? <GifLoading /> : 
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

