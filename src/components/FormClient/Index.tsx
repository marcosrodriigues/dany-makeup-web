import React, { useState, useEffect } from 'react';

import './style.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import CustomAlert from '../CustomAlert/Index';

import IClient from '../../interface/IClient';
import IAddress from '../../interface/IAddress';
import InputMask from 'react-input-mask';
import FormAddress from '../FormAddress/Index';

const FormClient = ({ client = { } as IClient, address = [] as IAddress[] }) => {

    const [user, setUser] = useState({} as IClient)

    const [citys, setCitys] = useState([]);
    const [ufs, setUfs] = useState([])

    useEffect(() => {
        if (client.id !== undefined) {
            setUser(client);
        }
    }, [client])

    return (
        <>
            <div className="form-client-box">
                <legend>
                Dados do cliente
                </legend>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="images col-sm-12">
                                <div className="box-images">
                                    <img src={user.avatar} alt={user.name} width="100%" />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <div className="info">
                                <Form.Group as={Row} controlId="name" className="w-100">
                                    <Form.Label column sm="2">Nome: </Form.Label>
                                    <Col sm="10">
                                        <Form.Control placeholder="Nome" 
                                            required
                                            name="user_name"
                                            value={user.name}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="email" className="w-100">
                                    <Form.Label column sm="2">Email: </Form.Label>
                                    <Col sm="10">
                                        <Form.Control placeholder="email@servidor.com"
                                            type="email"
                                            name="email"
                                            value={user.email}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="whatsapp" className="w-100">
                                    <Form.Label column sm="2">Whatsapp: </Form.Label>
                                    <Col sm="4">
                                        <InputMask 
                                            mask="+99 (99) 99999-9999"
                                            name="whatsapp"
                                            className="form-control"
                                            placeholder="+55 (DD) XXXXX-XXXX"
                                            value={user.whatsapp}
                                        />
                                    </Col>

                                    <Form.Label column sm="2">Password: </Form.Label>
                                    <Col sm="4">
                                        <Form.Control placeholder="password" 
                                            type="password"
                                            name="password"
                                            value={user.password}
                                        />
                                    </Col>
                                </Form.Group>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                address.length > 0 ?
                    <div className="form-client-box">
                        <legend>
                            Endereços
                        </legend>

                        {address.map(add => (
                            <FormAddress key={add.id} address={add} />
                        ))}
                    </div>
                :
                <></>
            }            
        </>
    )
}

export default FormClient;