import React, { useState, useEffect, FormEvent } from 'react';

import './style.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Dropzone from '../Dropzone/Index';
import api from '../../services/api';
import CustomAlert from '../Alert/Index';
import IPropsFormManufacturer from '../../interface/IPropsFormManufacturer';

const FormManufacturer : React.FC<IPropsFormManufacturer> = ({ manufacturer }) => {

    const [id, setId] = useState<number>(0);
    const [name, setName] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    
    const [file, setFile] = useState<File>({} as File);  

    const [showSucess, setShowSucess] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    
    useEffect(() => {
        if (manufacturer) {
            setId(manufacturer.id);
            setName(manufacturer.name);
            setImageUrl(manufacturer.image_url);
            setDescription(manufacturer.description);
        }
    }, [manufacturer]);

    function handleDrop(selectedFile: File[]) {
        setFile(selectedFile[0]);
        setImageUrl('');
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        setShowSucess(false);
        setShowError(false);
        setErrors([]);
        let errors : string[] = [];

        if (name === "") errors.push("Campo 'nome' é obrigatório.");
        if (description === "") errors.push("Campo 'descrição' é obrigatório.");
        if (imageUrl === "") {
            if (file && file.name === "") {
                errors.push("Adicione uma imagem ao fabricante.");
            }
        } 

        if (errors.length > 0) {
            setShowError(true);
            setErrors(errors);
            return;
        }

        const data = new FormData();

        data.append('id', String(id));
        data.append('name', name);
        data.append('description', description);
        data.append('image', file);

        try {
            if (id !== 0) await api.put('manufacturers', data)
            else await api.post('manufacturers', data);

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
                        multiple={false} 
                        array_image={[imageUrl]}
                    />
                </div>
            </div>
            <div className="info col-sm-6">

                <div className="alerts">
                    <CustomAlert visible={showSucess} type="success" />
                    <CustomAlert visible={showError} type="danger" error={errors} />
                </div>

                <Form.Group as={Row} controlId="name" className="w-100">
                    <Form.Label column sm="4">Nome do fabricante: </Form.Label>
                    <Col sm="8">
                        <Form.Control placeholder="Nome do fabricante" required
                            onChange={(event) => setName(event.target.value)} 
                            value={name} 
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="description" className="w-100">
                    <Form.Label column sm="4">Descrição: </Form.Label>
                    <Col sm="8">
                        <Form.Control as="textarea" rows={5} placeholder="Descrição do fabricante" required
                            onChange={(event) => setDescription(event.target.value)} 
                            value={description} 
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="button" className="w-100">
                    <Button variant="dark" className="w-100" type="submit" >Salvar</Button>
                </Form.Group>
            </div>
        </Form>
    )
}

export default FormManufacturer;