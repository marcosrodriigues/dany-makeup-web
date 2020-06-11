import React, { useState, useEffect } from 'react';

import './style.css';
import { Form, Row, Col, FormCheck, Button } from 'react-bootstrap';
import Dropzone from '../Dropzone/Index';
import IPropsFormProduct from '../../interface/IPropsFormProduto';
import ICategory from '../../interface/ICategory';

const FormProduto : React.FC<IPropsFormProduct> = ({ product }) => {

    const [name, setName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [fullDescription, setFullDescription] = useState('');
    const [value, setValue] = useState(0.0);    
    const [amount, setAmount] = useState(0);
    const [available, setAvailable] = useState(false);
    const [categoria, setCategoria] = useState<ICategory>({} as ICategory);  
    
    const [files, setFiles] = useState<File[]>([]);  
    
    useEffect(() => {
        if (product) {
            setName(product.name)
            setShortDescription(product.shortDescription);
            setFullDescription(product.fullDescription);
            setValue(product.value);
            setAmount(product.amount);
            setAvailable(product.avalable);
            setCategoria(product.category);
        }
    }, [product])

    useEffect(() => {
        console.log(files);
    }, [files])

    function handleDrop(files: File[]) {
        setFiles(files);
    }

    function handleSubmit() {
        console.log(
            name,
            shortDescription,
            fullDescription,
            value, 
            amount, 
            available, 
            categoria
        );
    }
    
    return (
        <Form onSubmit={handleSubmit}  className="form row">
            <div className="images col-sm-6">
                <div className="box-images">
                    <Dropzone onFileUploaded={handleDrop} />
                </div>
            </div>
            <div className="info col-sm-6">
                <Form.Group as={Row} controlId="name" className="w-100">
                    <Form.Label column sm="4">Nome do produto: </Form.Label>
                    <Col sm="8">
                        <Form.Control placeholder="Nome do produto"></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="shortDescription" className="w-100">
                    <Form.Label column sm="4">Descrição curta: </Form.Label>
                    <Col sm="8">
                        <Form.Control placeholder="Uma descrição curta do produto"></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="fullDescription" className="w-100">
                    <Form.Label column sm="4">Descrição completa: </Form.Label>
                    <Col sm="8">
                        <Form.Control as="textarea" placeholder="Descrição completa do produto"></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="valor" className="w-100">
                    <Form.Label column sm="4">Valor: </Form.Label>
                    <Col sm="8">
                        <Form.Control placeholder="R$ 39,90"></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="qtd" className="w-100">
                    <Form.Label column sm="4">Quantidade disponível: </Form.Label>
                    <Col sm="8">
                        <Form.Control placeholder="0"></Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="w-100">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8">
                        <Form.Check id="disponivel" type="checkbox">
                            <FormCheck.Input type="checkbox" isValid />
                            <Form.Check.Label>Produto disponível no app</Form.Check.Label>
                        </Form.Check>
                    </div>
                </Form.Group>
                <Form.Group as={Row} controlId="button" className="w-100">
                    <Button variant="dark" className="w-100" onClick={() => handleSubmit()}>Cadastrar</Button>
                </Form.Group>
            </div>
        </Form>
    )
}

export default FormProduto;