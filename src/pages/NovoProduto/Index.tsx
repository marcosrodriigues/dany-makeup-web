import React from 'react';
import Header from '../../components/Header/Index';

import './style.css';
import { Form, Row, Col, Button, FormCheck } from 'react-bootstrap';
import Dropzone from '../../components/Dropzone/Index';

const NovoProduto = () => {

    function handleSubmit() {
        console.log("submitted");
    }

    return (
        <div className="page">
            <Header />

            <div className="container">
                <div className="content">
                    <div className="row">
                        <div className="header">
                            <h1 className="header-title">Novo produto</h1>
                        </div>
                    </div>
                    <div className="box-product-horizontal">
                        <Form onSubmit={handleSubmit}  className="form row">
                            <div className="images col-sm-6">
                                <div className="box-images">
                                    <Dropzone onFileUploaded={() => console.log("console")} />
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
                                    <Button variant="dark" className="w-100">Cadastrar</Button>
                                </Form.Group>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NovoProduto;