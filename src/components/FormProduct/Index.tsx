import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';

import './style.css';
import { Form } from 'react-bootstrap';
import Dropzone from '../Dropzone/Index';
import IPropsFormProduct from '../../interface/IPropsFormProduto';
import ICategory from '../../interface/ICategory';
import api from '../../services/api';
import CustomAlert from '../CustomAlert/Index';
import CurrencyInput from 'react-currency-input';
import IManufacturer from '../../interface/IManufacturer';
import IFile from '../../interface/IFile';
import Thumbnails from '../Thumbnails/Index';
import { getFilename, buildFormData, isDataValid } from '../../util/util';
import GifLoading from '../GifLoading/Index';


const FormProduto = ({
    product, 
    categorys = undefined, 
    images = undefined,
    estoques = undefined
} : IPropsFormProduct ) => {

    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        short_description: '',
        full_description: '',
        value: 0.0,
        amount: 0,
        image_url: ''
    })

    const [stocks, setStocks] = useState<any>([]);
    const [productCategorys, setProductCategorys] = useState([]);  
    const [productManufacturer, setProductManufacturer] = useState<number>(0);  

    const [files, setFiles] = useState<File[]>([]);  
    const [mainImageUri, setMainImageUri] = useState<string>("");
    const [productImages, setProductImages] = useState<IFile[]>([]);

    const [categorias, setCategorias] = useState<ICategory[]> ([]);
    const [fabricantes, setFabricantes] = useState<IManufacturer[]> ([]);
    
    const [showSucess, setShowSucess] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    

    const [loading, isLoading] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData({
                id: product.id,
                name:  product.name,
                short_description:  product.short_description,
                full_description:  product.full_description,
                value: product.value,
                amount: product.amount,
                image_url: String(product.image_url),
            })
            setProductManufacturer(product.manufacturer_id);
            setMainImageUri(product.image_url);
            
        }
        
        if (categorys) {
            const ids: any = categorys.map(cat => {
                return cat.id;
            });
            setProductCategorys(ids);
        }
        
        if (images) {
            const img_urls = images.map(img => {
                const url = img.url || "";
                return {
                    file: { name: getFilename(url) } as File, 
                    url: url
                }
            })
            setProductImages(img_urls);
        }

        if(estoques) {
            setStocks(estoques);
        }
    }, [product, categorys, images, estoques])

    useEffect(() => {
        const params = {
            filter: false
        };
        try {
            api.get('categorys', { params }).then(response => {
                const { data } = response;
                setCategorias(data);
            })

            api.get('manufacturers', { params }).then(response => {
                const { data } = response;
                setFabricantes(data);
            })

            api.get('stores', { params }).then(response => {
                const { data } = response;

                const stocks = data.map((d:any) => {
                    return {
                        store_id: d.id,
                        name: d.name,
                        amount: 0
                    }
                })
                setStocks(stocks);
            })
        } catch (err) {
            alert('Erro ao carregar dados iniciais: ' + err);
            console.log(err);
        }
        
    }, [])

    async function handleDrop(uploadedFiles: IFile[]) {
        await Promise.all(uploadedFiles.map(f => {
            productImages.push(f);
            files.push(f.file);

            return f;
        }))
        setProductImages([...productImages]);
        setFiles([...files]);
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        if (loading) return;
        event.preventDefault();

        setShowSucess(false);
        setShowError(false);
        setErrors([]);

        if (!isDataValid(formData)) {
            setErrors(["Campos obrigatórios não preenchidos"]);
            setShowError(true);
            return;
        }

        const prod = {
            ...formData,
            categorys: productCategorys.join(','),
            manufacturer_id: productManufacturer
        }


        isLoading(true)
        const data = new FormData();
        buildFormData(data, prod);

        for(let i = 0; i < files.length; i++)
            data.append('images[]', files[i]);

        for(let i = 0; i < productImages.length; i++)
            if (!productImages[i].url.startsWith('blob'))
                data.append('url_images[]', productImages[i].url);

        for (let i = 0; i < stocks.length; i++) {
            if(stocks[i].id && stocks[i].id !== 0)
                data.append('stock_id[]', stocks[i].id)

            data.append('store_id[]', stocks[i].store_id)
            data.append('amounts[]', stocks[i].amount)
        }

        try {
            if (formData.id !== 0) await api.put('products', data);
            else await api.post('products', data);

            setShowSucess(true)
        } catch (err) {
            setShowError(true);
            setErrors([err]);
        }
        isLoading(false);
    }

    function handleSelect(event: ChangeEvent<HTMLSelectElement>) {
        const options = event.target.options;

        let selectedValues : any = [];

        for (let i = 0; i < options.length; i++) {
            if (options[i].selected)
                selectedValues.push(Number(options[i].value));
        }
    
        setProductCategorys(selectedValues);
    }

    function handleSelectedMainImage(url: string, filename: string) {
        setMainImageUri(url);
        setFormData({
            ...formData,
            image_url: filename
        });
    }

    function handleCurrencyInputChange(maskedvalue: string, floatvalue: number, event: ChangeEvent) {
        setFormData({...formData, value: floatvalue});
    }

    function handleFormValue(event) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    function handleStock(value, store_id) {
        const data = stocks.map(stock => {
            if (stock.store_id === store_id) {
                return {
                    ...stock,
                    amount: Number(value)
                }
            }

            return stock;
        })
        setStocks(data);
    }

    useEffect(() => {
        let amount = 0;
        stocks.map(s => amount += s.amount);
        setFormData(f => { return { ...f, amount }})
    }, [stocks])
    
    return (
        <Form onSubmit={handleSubmit}  className="form row">
            <div className="alerts">
                <CustomAlert visible={showSucess} type="success" />
                <CustomAlert visible={showError} type="danger" error={errors} />
            </div>

            <div className="row col-sm-12 box">
                <legend>Produto:</legend>
                <div className="col-sm-6">
                    <div className="form-group row">
                        <label htmlFor="name" className="form-label col-form-label col-sm-4">Nome do produto:*</label>
                        <div className="col-sm-8">
                            <input type="text" 
                                className="form-control"
                                name="name"
                                id="name"
                                placeholder="Nome do produto"
                                onChange={handleFormValue}
                                value={formData.name}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="manufacturer" className="form-label col-form-label col-sm-4">
                            Fabricante:*
                        </label>
                        <div className="col-sm-8">
                            <select className="form-control" 
                                id="manufacturer" 
                                name="manufacturer"
                                value={productManufacturer}
                                onChange={event => setProductManufacturer(Number(event.target.value))} 
                            >
                                <option disabled value={0}>SELECIONE O FABRICANTE</option>
                                {fabricantes.map(fab => (
                                    <option key={fab.id} value={fab.id}>{fab.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="categoria" className="col-form-label col-sm-4">
                            Categorias:*
                        </label>
                        <div className="col-sm-8">
                            <select className="form-control" 
                                id="categoria" 
                                multiple
                                value={productCategorys}
                                onChange={handleSelect} 
                            >
                                {categorias.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group row">
                        <label htmlFor="valor" className="col-form-label col-sm-4">
                            Valor:*
                        </label>
                        <div className="col-sm-8">
                            <CurrencyInput 
                                value={formData.value}
                                prefix="R$ "
                                onChange={handleCurrencyInputChange}
                                className="form-control"
                                id="valor"
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                    <label htmlFor="short_description" className="col-form-label col-sm-4">
                        Breve descrição:*
                    </label>
                    <div className="col-sm-8">
                        <input type="text" 
                            className="form-control"
                            name="short_description"
                            id="short_description"
                            placeholder="Breve descrição do produto"
                            onChange={handleFormValue}
                            value={formData.short_description}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="full_description" className="col-form-label col-sm-4">
                        Descrição completa:*
                    </label>

                    <div className="col-sm-8">
                        <textarea
                            className="form-control"
                            rows={4}
                            name="full_description"
                            id="full_description"
                            placeholder="Descrição completa do produto"
                            onChange={handleFormValue}
                            value={formData.full_description}
                        />
                    </div>
                </div>
            </div>
            </div>

            <div className="row col-sm-12 box">
                <legend>Estoque: - {formData.amount} unidade{formData.amount > 1 && 's'}</legend>
                
                <div className="col-sm-12">
                    <div className="form-group row">
                    
                    {stocks && stocks.map((stock, index) => (
                        <div className="col-sm-6 row">
                            <label htmlFor={`store_${index}`} className="form-label col-form-label col-sm-4"
                                style={index > 1 ? { marginTop:  8} : {}}
                                ><strong>{stock.name}</strong></label>
                            <div className="col-sm-8">
                                <input type="number"
                                    style={index > 1 ? { marginTop:  8} : {}}
                                    className="form-control"
                                    name={`store_${index}`}
                                    id={`store_${index}`}
                                    placeholder="0"
                                    onChange={event => handleStock(event.target.value, stock.store_id)}
                                    value={stock.amount}
                                    />
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
                
            <div className="row col-sm-12 box">
                <legend>Imagens:</legend>
                <div className="images col-sm-6">
                    <Dropzone 
                        onFileUploaded={handleDrop} 
                        selected={mainImageUri}
                    />
                </div>
                <div className="thumbnails col-sm-6">
                    <Thumbnails
                        onSelectedImage={handleSelectedMainImage}
                        setListImages={setProductImages}
                        list_images={productImages}
                        selected={mainImageUri}
                        messageBox={false}
                    />
                </div>
            </div>


            <div className="col-sm-12 mt16 mb16">
                {
                    loading ? <GifLoading /> :
                    <div className="w-100">
                        <button type="submit" className="btn btn-dark w-100">CADASTRAR</button>
                    </div>
                }
            </div>
        </Form>
    )
}

export default FormProduto;