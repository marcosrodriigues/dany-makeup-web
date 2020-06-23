import React, { useState, useEffect } from 'react';
import CustomAlert from '../CustomAlert/Index';

import './style.css'
import Dropzone from '../Dropzone/Index';
import api from '../../services/api';

const FormPromotion = () => {
    const [name, setName] = useState("");
    const [start, setStart] = useState({} as Date);
    const [end, setEnd] = useState({} as Date);
    const [originalValue, setOriginalValue] = useState(0);
    const [promotionValue, setPromotionValue] = useState(0);
    const [products, setProducts] = useState<any[]>([]);
    const [discount, setDiscount] = useState(0);
    const [images, setImages] = useState([]);
    
    const [categorys, setCategorys] = useState<any[]>([]);
    const [allProducts, setAllProducts] = useState<any[]>([]);
    const [idProducts, setIdProducts] = useState<any[]>([]);

    const [showSucess, setShowSucess] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        init();
    }, [])
    
    async function init() {
        try {
            const response = await api.get('category_products');
            const { data } = response;

            setCategorys(data);
        } catch (err) {
            console.log('erro ao carregar categorias e produtos', err);
            setShowError(true);
            setErrors([err]);
        }
    }

    useEffect(() => {
        const prods = getOnlyProducts(categorys);
        setAllProducts(prods);
    }, [categorys]);

    function getOnlyProducts(categorys: any[]) {

        const products: any = [];
        categorys
            .map(cat => cat.products)
            .map(arr => arr.map(
                prod => products.push(prod)
            ))
        
        return products;
    }

    function handleSubmit() {

    }

    function handleSelect(e) {
        const opts = e.target.options;

        const selectedValues: any = [];

        for (let i = 0; i < opts.length; i++) {
            if (opts[i].selected) {
                if (!selectedValues.includes(opts[i].value))
                    selectedValues.push(String(opts[i].value))
            }
                
        }
        setIdProducts(selectedValues);
    }

    function handleAddProducts() {
        const selected_products: any = products.map(c => c);
        
        allProducts.map(prod => {
            if (idProducts.includes(String(prod.id))) {
                const exist = selected_products.filter(s => s.id === prod.id);
                if (exist.length === 0)
                    selected_products.push(prod);
            }
        })

        console.log(products, selected_products);

        setProducts(selected_products)
    }

    useEffect(() => {
        console.log('products', products);
    }, [products])

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="form row">
            <div className="form-container col-sm-12">
                <div className="alerts">
                    <CustomAlert visible={showSucess} type="success" />
                    <CustomAlert visible={showError} type="danger" error={errors} />
                </div>

                <legend>Dados da promoção</legend>
                <div className="section-container">
                    <div className="form-group row">
                        <label htmlFor="name" className="col-form-label col-sm-1">Nome: </label>
                        <div className="col-sm-11">
                            <input id="name" type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group form-row">
                        <label htmlFor="start" className="col-form-label col-sm-1">Inicio</label>
                        <div className="col-sm-3">
                            <input id="start" type="date" className="form-control"/>
                        </div>

                        <label htmlFor="end" className="col-form-label col-sm-1">Fim</label>
                        <div className="col-sm-3">
                            <input id="end" type="date" pattern={"dd/MM/yyyy"} className="form-control"/>
                        </div>

                        <div className="col-sm-4 form-row">
                            <label htmlFor="value" className="col-form-label col-sm-2">Valor</label>
                            <div className="col-sm-10">
                                <input id="value" type="number" className="form-control"/>
                            </div>
                            <div className="col-sm-12 right">
                                <small>*Valor original: R$ xx,xx</small>
                            </div>
                        </div>
                    </div>
                </div>
            
                <legend>Dados dos produtos</legend>
                <div className="section-container">
                    <div className="flex-row">
                        <div className="col-sm-5 flex-center">
                            <div className="form-group">
                                <label className="col-form-label col-sm-12" htmlFor="produtos">Selecione os produtos que estarão nesta promoção</label>
                                <select 
                                    className="form-control select-products"
                                    id="produtos"
                                    onChange={handleSelect}
                                    value={idProducts}
                                    multiple
                                >
                                    {
                                        categorys.map(cat => {
                                            const id_inserteds = products.map(p => p.id)
                                            const options: any = [<option key={cat.title} disabled>{cat.title} - {cat.products.length}</option>]

                                            const products_category = cat.products;
                                            options.push(products_category.map((prod) => {
                                                if (id_inserteds.includes(prod.id)) return;
                                                return  <option key={`${String(prod.id)}`} value={`${String(prod.id)}`}>{prod.name}</option>
                                            }))

                                            return options
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-2 flex-center">
                            <div className="buttons">
                                <div className="btn btn-dark w-100" onClick={handleAddProducts}>
                                    <button type="button" className="btn btn-dark"> >>> </button>
                                </div>
                                {
                                    products.length > 0 &&
                                    <div className="btn btn-dark w-100 mt16" onClick={handleAddProducts}>
                                        <button type="button" className="btn btn-dark"> {"<<<"} </button>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="col-sm-5 align-top">
                            <label className="col-form-label col-sm-12" htmlFor="produtos">Produtos adicionados à promoção</label>
                            <div className="box-selected-products">
                                {
                                    products &&
                                    products.map(prod => {

                                        return (
                                            <div key={prod.id} className="row selected-product">
                                                <div className="col-sm-4 image">
                                                    <img src={prod.mainImage} alt="" width="100%" />
                                                </div>
                                                <div className="col-sm-8">
                                                    <p>{prod.name}</p>
                                                    <p>{prod.value}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            
                <legend>Imagens</legend>
                <div className="section-container">
                    <div className="section-images">
                        <Dropzone
                            // multiple={false}
                            // onChangeSelected={() => console.log("")}
                            onFileUploaded={() => console.log("")}
                            selected=""
                            //thumbnails={["", "", ""]}
                        />
                    </div>
                </div>
            
                <div className="section-container w-100">
                    <button className="btn btn-dark w-100"><span className="text-gold">Salvar</span></button>
                </div>
            </div>
        </form>
    )
}

export default FormPromotion