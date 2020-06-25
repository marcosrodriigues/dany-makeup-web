import React, { useState, useEffect, FormEvent } from 'react';

import './style.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import api, { api_ibge, api_cep } from '../../services/api';
import CustomAlert from '../CustomAlert/Index';

import IClient from '../../interface/IClient';
import IAddress from '../../interface/IAddress';
import InputMask from 'react-input-mask';

const FormClient = ({ client = { } as IClient, address = { } as IAddress }) => {

    const [userForm, setUserForm] = useState({
        user_id: 0,
        user_name: '',
        email: '',
        image: '',
        whatsapp: '+55',
        password: '',
        fb_id: ''
    })

    const [addressForm, setAddressForm] = useState({
        address_id: 0,
        address_name: '',
        cep: '',
        street: '',
        number: '',
        complement: '',
        reference: '',
        neighborhood: '',
        city: '',
        uf: ''
    })

    const [citys, setCitys] = useState([]);
    const [ufs, setUfs] = useState([])

    const [showSucess, setShowSucess] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    

    useEffect(() => {
        if (client.id !== undefined) {
            setUserForm({
                user_id: client.id,
                user_name: client.name,
                email: client.email,
                image: client.image,
                whatsapp: client.whatsapp || '+55',
                password: client.password || "",
                fb_id: client.fb_id || ""
            })
        } 
    }, [client])

    useEffect(() => {
        if (address.id !== undefined) {
            setAddressForm({
                address_id: address.id,
                address_name: address.name,
                cep: address.cep,
                street: address.street,
                number: address.number,
                complement: address.complement,
                reference: address.reference,
                neighborhood: address.neighborhood,
                city: address.city,
                uf: address.uf
            })
        }
    }, [address])

    useEffect(() => {
        const params = {
            orderBy: 'nome'
        }
        api_ibge.get('estados', { params }).then(response => {
            const { data } = response;

            const all_uf = data.map(({ sigla, nome }) => {
                return { sigla, nome }
            });

            setUfs(all_uf);
        })
    }, [])

    useEffect(() => {
        api_ibge.get(`estados/${addressForm.uf}/municipios`).then(response => {
            const { data } = response;

            const all_citys = data.map((city) => city.nome);
            setCitys(all_citys);
        })
    }, [addressForm.uf])

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        setShowSucess(false);
        setShowError(false);
        setErrors([]);

        const { user_id, user_name, email, password, whatsapp, image, fb_id } = userForm;
        const { address_id, address_name, cep, neighborhood, complement, number, reference, city, street, uf  } = addressForm;

        const user = {
            id: user_id,
            name: user_name,
            email, password, image, whatsapp, fb_id
        };
        const address = {
            id: address_id,
            name: address_name,
            cep, neighborhood, complement, number, reference, city, street, uf
        }

        const data = {
            user,
            address
        }
        
        try {
            await api.put('users', data)
            setShowSucess(true);
        } catch (err) {
            setShowError(true);
            setErrors([err]);
        }
    }

    async function onBlurCep() {
        const response = await api_cep.get(`${addressForm.cep}/json`);

        const {
            logradouro,
            complemento,
            bairro,
            localidade,
            uf
        } = response.data;

        setAddressForm({
            ...addressForm,
            street: logradouro,
            complement: complemento,
            neighborhood: bairro,
            uf: uf,
            city: localidade,
        })
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setUserForm({ ...userForm, [name]:value })
    }

    function handleAddressInputChange(event) {
        const { name, value } = event.target;
        setAddressForm({ ...addressForm, [name]:value })
    }

    return (
        <Form onSubmit={handleSubmit} encType="multipart/form-data"  className="form row">
            <div className="form-client-box">
                <legend>
                Dados do cliente
                </legend>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="images col-sm-12">
                                <div className="box-images">
                                    <img src={userForm.image} alt={userForm.user_name} width="100%" />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <div className="info">
                                <div className="alerts">
                                    <CustomAlert visible={showSucess} type="success" />
                                    <CustomAlert visible={showError} type="danger" error={errors} />
                                </div>

                                <Form.Group as={Row} controlId="name" className="w-100">
                                    <Form.Label column sm="2">Nome: </Form.Label>
                                    <Col sm="10">
                                        <Form.Control placeholder="Nome" 
                                            required
                                            name="user_name"
                                            value={userForm.user_name}
                                            onChange={handleInputChange} 
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="email" className="w-100">
                                    <Form.Label column sm="2">Email: </Form.Label>
                                    <Col sm="10">
                                        <Form.Control placeholder="email@servidor.com"
                                            type="email"
                                            name="email"
                                            value={userForm.email}
                                            onChange={handleInputChange} 
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
                                            onChange={handleInputChange}
                                            placeholder="+55 (DD) XXXXX-XXXX"
                                            value={userForm.whatsapp}
                                        />
                                    </Col>

                                    <Form.Label column sm="2">Password: </Form.Label>
                                    <Col sm="4">
                                        <Form.Control placeholder="password" 
                                            type="password"
                                            name="password"
                                            value={userForm.password}
                                            onChange={handleInputChange}
                                        />
                                    </Col>
                                </Form.Group>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="form-client-box">
                <legend>
                    Endereços
                </legend>
                <div className="col-sm-12">
                    <div className="form-group row">
                        <label htmlFor="addressName" className="form-label col-form-label col-sm-1">Nome:</label>
                        <div className="col-sm-11">
                            <input 
                                type="text" 
                                id="addressName"
                                name="address_name"
                                placeholder="Endereço residencial, comercial..." 
                                className="form-control"
                                value={addressForm.address_name}
                                onChange={handleAddressInputChange}
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="cep" className="form-label col-form-label col-sm-1">CEP:</label>
                        <div className="col-sm-2">
                            <InputMask 
                                mask="99999-999"
                                id="cep"
                                className="form-control"
                                name="cep"
                                value={addressForm.cep}
                                onChange={handleAddressInputChange}
                                onBlur={onBlurCep}
                            />
                        </div>

                        <label htmlFor="street" className="form-label col-form-label col-sm-2">Logradouro:</label>
                        <div className="col-sm-7">
                            <input 
                                type="text" 
                                id="street" 
                                name="street"
                                className="form-control"
                                value={addressForm.street}
                                onChange={handleAddressInputChange}
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="number" className="form-label col-form-label col-sm-1">Nº:</label>
                        <div className="col-sm-2">
                            <input 
                                type="text" 
                                id="number" 
                                name="number"
                                className="form-control"
                                value={addressForm.number}
                                onChange={handleAddressInputChange}
                            />
                        </div>

                        <label htmlFor="complement" className="form-label col-form-label col-sm-2">Complemento:</label>
                        <div className="col-sm-3">
                            <input 
                                type="text" 
                                id="complement" 
                                name="complement"
                                className="form-control"
                                value={addressForm.complement}
                                onChange={handleAddressInputChange}
                            />
                        </div>

                        <label htmlFor="reference" className="form-label col-form-label col-sm-1">Referência:</label>
                        <div className="col-sm-3">
                            <input 
                                type="text" 
                                id="reference" 
                                className="form-control"
                                name="reference"
                                value={addressForm.reference}
                                onChange={handleAddressInputChange}
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="neighborhood" className="form-label col-form-label col-sm-1">Bairro:</label>
                        <div className="col-sm-2">
                            <input 
                                type="text"
                                id="neighborhood" 
                                className="form-control"
                                name="neighborhood"
                                value={addressForm.neighborhood}
                                onChange={handleAddressInputChange}
                            />
                        </div>

                        <label htmlFor="city" className="form-label col-form-label col-sm-2">Cidade:</label>
                        <div className="col-sm-3">
                            <select 
                                id="city" 
                                className="form-control"
                                name="city"
                                value={addressForm.city}
                                onChange={handleAddressInputChange}
                            >
                                <option disabled selected>SELECIONE O ESTADO</option>
                                {
                                citys && citys.map((city: any) => (
                                    <option key={city} value={city}>{city}</option>
                                ))   
                                }
                            </select>
                        </div>

                        <label htmlFor="uf" className="form-label col-form-label col-sm-1">UF:</label>
                        <div className="col-sm-3">
                            <select 
                                id="uf" 
                                name="uf"
                                className="form-control"
                                value={addressForm.uf}
                                onChange={handleAddressInputChange}
                            >
                                <option disabled selected>SELECIONE O ESTADO</option>
                                {
                                ufs && ufs.map((uf: any) => (
                                    <option key={uf.sigla} value={uf.sigla}>{uf.nome}</option>
                                ))   
                                }
                            </select>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className="form-client-button-box">
                <Form.Group controlId="button" className="w-100">
                    <Button variant="dark" className="w-100" type="submit" >Salvar</Button>
                </Form.Group>
            </div>
        </Form>
    )
}

export default FormClient;