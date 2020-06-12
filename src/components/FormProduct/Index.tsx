import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';

import './style.css';
import { Form, Row, Col, FormCheck, Button } from 'react-bootstrap';
import Dropzone from '../Dropzone/Index';
import IPropsFormProduct from '../../interface/IPropsFormProduto';
import ICategory from '../../interface/ICategory';
import api from '../../services/api';
import CustomAlert from '../Alert/Index';

const FormProduto : React.FC<IPropsFormProduct> = ({ product }) => {

    const [id, setId] = useState<number>(0);
    const [name, setName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [fullDescription, setFullDescription] = useState('');
    const [value, setValue] = useState(0.0);    
    const [amount, setAmount] = useState(0);
    const [available, setAvailable] = useState(false);
    const [categorias, setCategorias] = useState<number[]>([]);  
    const [files, setFiles] = useState<File[]>([]);  
    const [mainImage, setMainImage] = useState<string>("");

    const [categorys, setCategorys] = useState<ICategory[]> ([]);
    
    const [showSucess, setShowSucess] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    
    useEffect(() => {
        if (product) {
            setName(product.name)
            setShortDescription(product.shortDescription);
            setFullDescription(product.fullDescription);
            setValue(product.value);
            setAmount(product.amount);
            setAvailable(product.avalable);
            //setCategoria(product.category);
        }
    }, [product])

    useEffect(() => {
        try {
            api.get('categorys?available=true').then(response => {
                const { data } = response;
                setCategorys(data);
            })
        } catch (err) {
            alert('Erro ao preencher categorias: ' + err);
            console.log(err);
        }
        
    }, [])

    function handleDrop(files: File[]) {
        setFiles(files);
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setShowSucess(false);
        setShowError(false);
        setErrors([]);

        let error_msg = [];

        if (files.length == 0) {
            error_msg.push("Insira pelo menos uma imagem.");
            setShowError(true);
        }
        if (mainImage === "") {
            error_msg.push("Escolha a imagem principal.")
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
        data.append('categorys', categorias.join(','));
        data.append('mainImage', mainImage);

        for(var i = 0; i < files.length; i++)
            data.append('images[]', files[i]);

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

        let selectedValues = [];

        for (let i = 0; i < options.length; i++) {
            if (options[i].selected)
                selectedValues.push(Number(options[i].value));
        }
    
        setCategorias(selectedValues);
    }

    function handleSelectMainImage(filename: string) {
        setMainImage(filename);
    }
    return (
        <Form onSubmit={handleSubmit}  className="form row">
            <div className="images col-sm-6">
                <div className="box-images">
                    <Dropzone 
                        onFileUploaded={handleDrop} 
                        onSelectMainFile={handleSelectMainImage}
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
                <Form.Group as={Row} controlId="categoria" className="w-100">
                    <label htmlFor="categoria" className="form-label col-sm-4">
                        Categorias:
                    </label>
                    <div className="col-sm-8">
                        <select className="form-control" id="categoria" multiple value={categorias.join(',')} onChange={handleSelect} >
                            {categorys && categorys.map(cat => (
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
                        <Form.Control placeholder="R$ 39,90" 
                            onChange={(event) => setValue(Number(event.target.value))} 
                            value={value} 
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="qtd" className="w-100">
                    <Form.Label column sm="4">Quantidade disponível: </Form.Label>
                    <Col sm="8">
                        <Form.Control placeholder="0"
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