import React, { useState, useEffect } from 'react';
import CustomAlert from '../CustomAlert/Index';

import './style.css'
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import CurrencyInput from 'react-currency-input';

import Dropzone from '../Dropzone/Index';   
import api from '../../services/api';
import Thumbnails from '../Thumbnails/Index';
import IFile from '../../interface/IFile';

import DatePicker, { registerLocale } from 'react-datepicker';

import pt from 'date-fns/esm/locale/pt-BR'
import { FaDownload } from 'react-icons/fa';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { getFilename } from '../../util/util';
import IPromotion from '../../interface/IPromotion';
registerLocale('pt', pt)

const FormPromotion = ({ promotion = {} as IPromotion, promotionProducts = [], promotionImages = [] }) => {

    const [formPromotion, setFormPromotion] = useState({
        id: 0,
        name: '',
        start: new Date(),
        end: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        originalValue: 0.0,
        promotionValue: 0.0,
        discount: 0.0,
        image_url: '',
        discountType: '%',
        description: ''
    })

    const [products, setProducts] = useState<any[]>([]);
    const [images, setImages] = useState<IFile[]>([]);
    const [mainImageUri, setMainImageUri] = useState<string>("");
    
    const [files, setFiles] = useState<File[]>([]);

    const [categorys, setCategorys] = useState<any[]>([]);
    const [allProducts, setAllProducts] = useState<any[]>([]);
    const [idProducts, setIdProducts] = useState<any[]>([]);

    const [showSucess, setShowSucess] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        init();
    }, [])


    useEffect(() => {
        if (promotion.id !== undefined){
            setFormPromotion({
                id: promotion.id,
                name: promotion.name,
                start: new Date(promotion.start),
                end: new Date(promotion.end),
                originalValue: Number(promotion.originalValue),
                promotionValue: promotion.promotionValue,
                discount: promotion.discount,
                image_url: promotion.image_url,
                discountType: promotion.discountType,
                description: promotion.description
            })
            setMainImageUri(promotion.image_url);
        }
    }, [promotion]);

    useEffect(() => {
        if (promotionProducts.length > 0) {
            setProducts(promotionProducts);
            const ids = promotionProducts.map((prod: any) => prod.id);
            setIdProducts(ids);
        }
    }, [promotionProducts])

    useEffect(() => {
        if (promotionImages.length > 0) {
            const imgs = promotionImages
                .map((image: any) => {
                    return {
                        file: { name: getFilename(image.url) } as File,
                        url: image.url
                    }
                })
            setImages(imgs);
        }
    }, [promotionImages])
    
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

    useEffect(() => {
        let sum_value = 0;
        products.map(prod => {
            sum_value = sum_value + Number(prod.value);
            return prod;
        })
        setFormPromotion({
            ...formPromotion,
            originalValue: sum_value,
        })

        setFormPromotion(f => { return { ...f, originalValue: sum_value } })
    }, [products])

    function getOnlyProducts(categorys: any[]) {

        const products: any = [];
        categorys
            .map(cat => cat.products)
            .map(arr => arr.map(
                prod => products.push(prod)
            ))
        
        return products;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setShowSucess(false);
        setShowError(false);
        setErrors([]);
        
        const data = new FormData();
        data.append('promotion', JSON.stringify(formPromotion));

        const products_id = products.map(prod => prod.id).join(',');
        data.append('products', products_id);

        for(let i = 0; i < images.length; i++) {
            if (!images[i].url.startsWith('blob'))
            data.append('images[]', images[i].url);
        }

        for(let i = 0; i < files.length; i++) {
            data.append('files[]', files[i]);
        }

        try {
            if (formPromotion.id !== 0) await api.put('promotions', data);
            else await api.post('promotions', data);

            setShowSucess(true);
        } catch (err) {
            console.log("Error save promotion", err);
            setShowError(true);
            setErrors(err.error);
        }
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
            return prod;
        })

        setProducts(selected_products)
    }

    function handleFileUploads(uploadeds: IFile[]) {
        const uploaded_images= images;
        const uploaded_files = files;

        uploadeds.map(up => {
            uploaded_images.push(up); 
            uploaded_files.push(up.file); 
            return up;
        });

        setFiles([...uploaded_files]);
        setImages([...uploaded_images]);
    }

    async function handleClickImportImageButton(id: number) {
        const response = await api.get(`images/product/${id}`);
        const images_url: any = response.data;

        const imported_files = images_url.map(img => ({ file: { name: getFilename(img.url) } as File, url: img.url }))

        if (images.length > 0)
            images.map(img => imported_files.push(img))

        console.log(imported_files);

        setImages(imported_files);
    }

    function handleClickRemoveImage(id: number) {
        const filtered = products.filter(prod => prod.id !== id);
        setProducts(filtered);
    
    }

    function handleMainSelectedImage(url: string, filename: string) {
        setMainImageUri(url);
        setFormPromotion({
            ...formPromotion,
            image_url: filename
        });
    }

    useEffect(() => {
        const discountType = formPromotion.discountType;
        const discount = formPromotion.discount;
        const originalValue = formPromotion.originalValue;

        if (discountType === "R$") {
            if (discount <= originalValue)
                setFormPromotion(f => { return {
                    ...f,
                    promotionValue: originalValue - discount
                } })
            else
                alert('Valor de desconto excete o máximo.')
        } else if (discountType === "%") {
            if (discount <= 100)
                setFormPromotion(f => { return {
                    ...f,
                    promotionValue: originalValue - (originalValue * (discount / 100))
                } } )
            else
                alert('Valor de desconto excete o máximo.')
        }
    }, [formPromotion.discountType, formPromotion.discount, formPromotion.originalValue])

    function handleFormPromotion(e) {
        const { name, value } = e.target;
        setFormPromotion({
            ...formPromotion,
            [name]: value
        })
    }

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="form row">
            <div className="form-container col-sm-12">
                <div className="alerts">
                    <CustomAlert visible={showSucess} type="success" />
                    <CustomAlert visible={showError} type="danger" error={errors} />
                </div>

                <legend>Dados da promoção</legend>
                <div className="section-container">
                    <div className="form-group form-row">
                        <label htmlFor="name" className="col-form-label col-sm-1">Nome: </label>
                        <div className="col-sm-11">
                            <input 
                                id="name" 
                                type="text" 
                                className="form-control"
                                value={formPromotion.name}
                                name="name"
                                onChange={handleFormPromotion} 
                            />
                        </div>
                    </div>
                    <div className="form-group form-row">
                        <label htmlFor="start" className="col-form-label col-sm-1">Inicio:</label>
                        <div className="col-sm-3">
                            <DatePicker
                                id="start"
                                selected={formPromotion.start}
                                onChange={(date: Date) => setFormPromotion({...formPromotion, start: date})}
                                showTimeSelect
                                timeFormat="HH:mm"
                                locale="pt"
                                timeIntervals={30}
                                timeCaption="Hora"
                                dateFormat="dd/MM/yyyy hh:mm aa"
                                className="form-control"
                                placeholderText="Início da promoção"
                            />
                        </div>

                        <label htmlFor="end" className="col-form-label col-sm-1">Fim:</label>
                        <div className="col-sm-3">
                            <DatePicker
                                id="end"
                                selected={formPromotion.end}
                                onChange={(date: Date) => setFormPromotion({...formPromotion, end: date})}
                                showTimeSelect
                                timeFormat="HH:mm"
                                locale="pt"
                                timeIntervals={30}
                                timeCaption="Hora"
                                dateFormat="dd/MM/yyyy hh:mm aa"
                                className="form-control"
                                placeholderText="Fim da promoção"
                                minDate={formPromotion.start}

                            />
                        </div>

                        <div className="col-sm-4">
                            <div className="form-group row">
                                <label htmlFor="" className="col-form-label col-sm-4">Valor original:</label>
                                <div className="col-sm-8">
                                    <label className="col-form-label">R$ {formPromotion.originalValue.toFixed(2)}</label>
                                </div>
                            </div>
                            
                            </div>
                    </div>
                
                    <div className="form-group form-row">
                        <label htmlFor="description" className="col-form-label col-sm-1">Descrição: </label>
                        <div className="col-sm-7">
                            <textarea 
                                rows={3}
                                id="description" 
                                className="form-control"
                                value={formPromotion.description}
                                name="description"
                                onChange={handleFormPromotion} 
                            />
                        </div>
                        <div className="col-sm-4">
                        <div className="form-group row">
                                <label htmlFor="discount" className="col-form-label col-sm-4">Desconto:</label>
                                <div className="col-sm-4">
                                    <select id="select-discount" value={formPromotion.discountType} name="discountType" onChange={handleFormPromotion} className="form-control">
                                        <option value="%">%</option>
                                        <option value="R$">R$</option>
                                    </select>
                                </div>
                                <div className="col-sm-4">
                                    <CurrencyInput 
                                        value={formPromotion.discount}
                                        onChange={(mv, fv) => setFormPromotion({...formPromotion, discount: fv})}
                                        className="form-control"
                                        id="discount"
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="value" className="col-form-label col-sm-4">Valor final:</label>
                                <div className="col-sm-8">
                                    <CurrencyInput 
                                        inputType="text"
                                        value={formPromotion.promotionValue}
                                        prefix="R$ "
                                        onChange={(mv, fv) => setFormPromotion({...formPromotion, promotionValue: fv})}
                                        className="form-control"
                                        id="value"
                                    />
                                </div>
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
                                    <button type="button" className="btn btn-dark text-gold"> {">>>"} </button>
                                </div>
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
                                                    <img src={prod.image_url} alt="" width="100%" />
                                                </div>
                                                <div className="col-sm-8">
                                                    <p>{prod.name}</p>
                                                    <p>R$ {Number(prod.value).toFixed(2)}</p>
                                                    <div className="col-sm-12">
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark mlr8 col-sm-5"
                                                            onClick={() => handleClickImportImageButton(prod.id)}
                                                        >  
                                                            <FaDownload aria-label="Importar imagens" className="mlr8" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger mlr8 col-sm-5"
                                                            onClick={() => handleClickRemoveImage(prod.id)}
                                                        >  
                                                            <IoIosCloseCircleOutline aria-label="Importar imagens" className="mlr8" />
                                                        </button>
                                                    </div>
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
                            onFileUploaded={handleFileUploads}
                            selected={mainImageUri}
                        />
                        <Thumbnails
                            list_images={images}
                            setListImages={setImages}
                            onSelectedImage={handleMainSelectedImage}
                            selected={mainImageUri}
                            messageBox={false}
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