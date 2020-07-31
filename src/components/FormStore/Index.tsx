import React, { useState, useEffect, FormEvent } from 'react';

import './style.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Dropzone from '../Dropzone/Index';
import api from '../../services/api';
import CustomAlert from '../CustomAlert/Index';
import IFile from '../../interface/IFile';
import FormAddress from '../FormAddress/Index';
import { isDataValid, buildFormData } from '../../util/util';

interface Props {
    store?: any;
}
const FormStore : React.FC<Props> = ({ store }) => {

    const [formStore, setFormStore] = useState({
        id: 0,
        name: '',
        image_url: '',
        description: '',
    });

    const [addressForm, setAddressForm] = useState({
        id: 0,
        name: '',
        cep: '',
        street: '',
        number: '',
        complement: '',
        reference: '',
        neighborhood: '',
        city: '',
        uf: '',
    })

    const [file, setFile] = useState<File>({} as File);  

    const [showSucess, setShowSucess] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    
    useEffect(() => {
        if (store) {
            setFormStore({
                id: store.id,
                description: store.description,
                name: store.name,
                image_url: store.image_url
            })

            if (store.address) {
                setAddressForm(store.address);
            }
        }
    }, [store]);

    function handleDrop(selectedFile: IFile[]) {
        setFile(selectedFile[0].file);
        setFormStore({
            ...formStore,
            image_url: selectedFile[0].url
        })
    }

    function onChangeFormStore(event) {
        const { name, value } = event.target;
        setFormStore({...formStore, [name]: value})
    }

    function onAddressInputChange(event) {
        const { name, value } = event.target;
        setAddressForm({...addressForm, [name]: value})
    }

    function handleAddressChange(new_state) {
        setAddressForm(new_state);
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        setShowSucess(false);
        setShowError(false);
        setErrors([]);

        const validAddress = {
            cep: addressForm.cep,
            street: addressForm.street,
            number: addressForm.number,
            neighborhood: addressForm.neighborhood,
            city: addressForm.city,
            uf: addressForm.uf
        }

        if (!isDataValid(formStore) || !isDataValid(validAddress)) {
            setErrors(["Campos obrigatórios não preenchidos"]);
            setShowError(true);
            return;
        }

        const formAddress = {
            address_id: addressForm.id,
            address_name: addressForm.name,
            cep: addressForm.cep,
            street: addressForm.street,
            number: addressForm.number,
            complement: addressForm.complement,
            reference: addressForm.reference,
            neighborhood: addressForm.neighborhood,
            city: addressForm.city,
            uf: addressForm.uf,
        }

        const formData = new FormData();
        buildFormData(formData, formStore);
        buildFormData(formData, formAddress);
        
        if (file)
            formData.append('image', file);

        try {
            if (formStore.id !== 0) await api.put('stores', formData)
            else await api.post('stores', formData);

            setShowSucess(true);
        } catch (err) {
            setShowError(true);
            setErrors([err]);
        }
    }

    return (
        <Form onSubmit={handleSubmit} encType="multipart/form-data"  className="form row">
            <div className="images col-sm-6">
                <div className="box-images">
                    <Dropzone 
                        onFileUploaded={handleDrop}
                        selected={formStore.image_url}
                    />
                </div>
            </div>
            <div className="info col-sm-6">
                <div className="alerts">
                    <CustomAlert visible={showSucess} type="success" />
                    <CustomAlert visible={showError} type="danger" error={errors} />
                </div>

                <Form.Group as={Row} controlId="name" className="w-100">
                    <Form.Label column sm="4">Nome da loja: </Form.Label>
                    <Col sm="8">
                        <Form.Control placeholder="Nome da loja" required
                            name="name"
                            onChange={onChangeFormStore} 
                            value={formStore.name} 
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="description" className="w-100">
                    <Form.Label column sm="4">Descrição: </Form.Label>
                    <Col sm="8">
                        <Form.Control as="textarea" rows={5} placeholder="Descrição da loja"
                            name="description"
                            onChange={onChangeFormStore} 
                            value={formStore.description} 
                        />
                    </Col>
                </Form.Group>
            </div>
            <div className="col-sm-12 w-100">
                <FormAddress
                    address={addressForm}
                    onInputChange={onAddressInputChange}
                    onAddressChange={handleAddressChange}
                />

                <Form.Group as={Row} controlId="button" className="form-button">
                    <Button variant="dark" className="w-100" type="submit" >Salvar</Button>
                </Form.Group>
            </div>        
        </Form>
    )
}

export default FormStore;