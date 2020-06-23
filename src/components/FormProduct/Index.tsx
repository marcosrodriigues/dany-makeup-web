import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';

import './style.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Dropzone from '../Dropzone/Index';
import IPropsFormProduct from '../../interface/IPropsFormProduto';
import ICategory from '../../interface/ICategory';
import api from '../../services/api';
import CustomAlert from '../CustomAlert/Index';
import CurrencyInput from 'react-currency-input';
import IManufacturer from '../../interface/IManufacturer';
import IFile from '../../interface/IFile';
import Thumbnails from '../Thumbnails/Index';
import { getFilename } from '../../util/util';


const FormProduto : React.FC<IPropsFormProduct> = ({ product, categorys = undefined, images = undefined }) => {

    const [id, setId] = useState<number>(0);
    const [name, setName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [fullDescription, setFullDescription] = useState('');
    const [value, setValue] = useState<number>(0.0);    
    const [amount, setAmount] = useState<number>(0);
    const [available, setAvailable] = useState(false);
    const [productCategorys, setProductCategorys] = useState([]);  
    const [productManufacturer, setProductManufacturer] = useState<number>(0);  

    const [files, setFiles] = useState<File[]>([]);  
    const [mainImage, setMainImage] = useState<string>("");
    const [mainImageUri, setMainImageUri] = useState<string>("");
    const [productImages, setProductImages] = useState<IFile[]>([]);

    const [categorias, setCategorias] = useState<ICategory[]> ([]);
    const [fabricantes, setFabricantes] = useState<IManufacturer[]> ([]);
    
    const [showSucess, setShowSucess] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    
    useEffect(() => {
        if (product) {
            setId(product.id);
            setName(product.name)
            setShortDescription(product.shortDescription);
            setFullDescription(product.fullDescription);
            setValue(product.value);
            setAmount(product.amount);
            setAvailable(product.available);
            setMainImage(product.mainImage);
            setMainImageUri(product.mainImage);
            setProductManufacturer(product.manufacturer_id);
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
    }, [product, categorys, images])

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
        } catch (err) {
            alert('Erro ao preencher categorias e fabricantes: ' + err);
            console.log(err);
        }
        
    }, [])

    async function handleDrop(uploadedFiles: IFile[]) {
        await Promise.all(uploadedFiles.map(f => {
            productImages.push(f);
            files.push(f.file);
        }))
        setProductImages([...productImages]);
        setFiles([...files]);
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setShowSucess(false);
        setShowError(false);
        setErrors([]);

        let error_msg : string[] = [];

        if (files.length === 0 && productImages.length === 0) {
            error_msg.push("Insira pelo menos uma imagem.");
            setShowError(true);
        }
        if (mainImage === "") {
            error_msg.push("Escolha a imagem principal.")
            setShowError(true);
        }
        if (productManufacturer === 0) {
            error_msg.push("Selecione o fabricante do produto.")
            setShowError(true);
        }

        if (error_msg.length > 0) {
            setErrors(error_msg);
            return
        };

        const data = new FormData();

        data.append('id', String(id));
        data.append('name', name);
        data.append('shortDescription', shortDescription);
        data.append('fullDescription', fullDescription);
        data.append('value', String(value)); 
        data.append('amount', String(amount)); 
        data.append('available', String(available)); 
        data.append('categorys', productCategorys.join(','));
        data.append('mainImage', mainImage);
        data.append('manufacturer_id', String(productManufacturer));

        if(files.length > 0)
            for(let i = 0; i < files.length; i++)
                data.append('images[]', files[i]);

        if (productImages)
            for(let i = 0; i < productImages.length; i++) {
                if (!productImages[i].url.startsWith('blob'))
                    data.append('url_images[]', productImages[i].url);
            }

        try {
            if (id !== 0) await api.put('products', data);
            else await api.post('products', data);

            setShowSucess(true)
        } catch (err) {
            setShowError(true);
            setErrors([err]);
        }
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
        setMainImage(filename);
    }

    function handleCurrencyInputChange(maskedvalue: string, floatvalue: number, event: ChangeEvent) {
        setValue(floatvalue);
    }
    
    return (
        <Form onSubmit={handleSubmit}  className="form row">
            <div className="images col-sm-6">
                <div className="box-images">
                    <Dropzone 
                        onFileUploaded={handleDrop} 
                        selected={mainImageUri}
                    />
                    <Thumbnails
                        onSelectedImage={handleSelectedMainImage}
                        setListImages={setProductImages}
                        list_images={productImages}
                        selected={mainImageUri}
                    />
                </div>
            </div>
            <div className="info col-sm-6">
                <div className="alerts">
                    <CustomAlert visible={showSucess} type="success" />
                    <CustomAlert visible={showError} type="danger" error={errors} />
                </div>

                <Form.Group as={Row} controlId="name" className="w-100">
                    <Form.Label column sm="4">Nome do produto: </Form.Label>
                    <Col sm="8">
                        <Form.Control placeholder="Nome do produto"
                            onChange={(event) => setName(event.target.value)} 
                            value={name} 
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="fabricante" className="w-100">
                    <label htmlFor="fabricante" className="form-label col-sm-4">
                        Fabricante:
                    </label>
                    <div className="col-sm-8">
                        <select className="form-control" 
                            id="fabricantes" 
                            value={productManufacturer}
                            onChange={event => setProductManufacturer(Number(event.target.value))} 
                        >
                            <option disabled value={0}>SELECIONE O FABRICANTE</option>
                            {fabricantes.map(fab => (
                                <option key={fab.id} value={fab.id}>{fab.name}</option>
                            ))}
                        </select>
                    </div>
                </Form.Group>
                <Form.Group as={Row} controlId="categoria" className="w-100">
                    <label htmlFor="categoria" className="form-label col-sm-4">
                        Categorias:
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
                </Form.Group>
                <Form.Group as={Row} controlId="shortDescription" className="w-100">
                    <Form.Label column sm="4">Descrição curta: </Form.Label>
                    <Col sm="8">
                        <Form.Control placeholder="Uma descrição curta do produto"
                            onChange={(event) => setShortDescription(event.target.value)} 
                            value={shortDescription} 
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="fullDescription" className="w-100">
                    <Form.Label column sm="4">Descrição completa: </Form.Label>
                    <Col sm="8">
                        <Form.Control as="textarea" rows={4} placeholder="Descrição completa do produto"
                            onChange={(event) => setFullDescription(event.target.value)} 
                            value={fullDescription} 
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="valor" className="w-100">
                    <Form.Label column sm="4">Valor: </Form.Label>
                    <Col sm="8">
                        <CurrencyInput 
                            value={value}
                            prefix="R$ "
                            onChange={handleCurrencyInputChange}
                            className="form-control"
                            id="valor"
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="qtd" className="w-100">
                    <Form.Label column sm="4">Quantidade disponível: </Form.Label>
                    <Col sm="8">
                        <Form.Control type="number" placeholder="0"
                            onChange={(event) => setAmount(Number(event.target.value))}
                            value={amount}
                        >
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="w-100">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8">
                        <div className="form-check">
                            <input 
                                type="checkbox" 
                                id="disponivel" 
                                checked={available}
                                onChange={() => setAvailable(!available)}
                                className="form-check-input" />
                            <label htmlFor="disponivel">Produto disponível</label>
                        </div> 
                    </div>
                </Form.Group>
                <Form.Group as={Row} controlId="button" className="w-100">
                    <Button variant="dark" className="w-100" type="submit" >Cadastrar</Button>
                </Form.Group>
            </div>
        </Form>
    )
}

export default FormProduto;