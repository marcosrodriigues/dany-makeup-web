import React, { useState, useEffect, FormEvent } from 'react';

import './style.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Dropzone from '../Dropzone/Index';
import IPropsFormCategory from '../../interface/IPropsFormCategory';
import api from '../../services/api';
import CustomAlert from '../CustomAlert/Index';
import IFile from '../../interface/IFile';
import GifLoading from '../GifLoading/Index';

const FormCategory : React.FC<IPropsFormCategory> = ({ category }) => {

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [id, setId] = useState<number>(0);
    //const [available, setAvailable] = useState<boolean>(false);
    
    const [file, setFile] = useState<File>({} as File);  

    const [showSucess, setShowSucess] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);


    const [loading, isLoading] = useState(false);
    
    useEffect(() => {
        if (category) {
            setTitle(category.title);
            setImageUrl(category.image_url);
            setId(category.id);
            setDescription(category.description)
        }
    }, [category]);

    function handleDrop(selectedFile: IFile[]) {
        setFile(selectedFile[0].file);
        setImageUrl(selectedFile[0].url);
    }

    async function handleSubmit(event: FormEvent) {
        if(loading) return;
        event.preventDefault();

        setShowSucess(false);
        setShowError(false);
        setErrors([]);

        if (!file && imageUrl === "") {
            setErrors(["Insira uma imagem."]);
            setShowError(true);
            return;
        }

        isLoading(true);
        const data = new FormData();

        data.append('id', String(id));
        data.append("title", title);
        data.append("description", description);
        
        data.append('image', file);

        try {
            if (id !== 0) await api.put('categorys', data)
            else await api.post('categorys', data);

            setShowSucess(true);
        } catch (err) {
            setShowError(true);
            setErrors([err]);
        }
        isLoading(false);
    }

    useEffect(() => {
        
    }, [imageUrl]);
    return (
        <Form onSubmit={handleSubmit} encType="multipart/form-data"  className="form row">
            <div className="images col-sm-6">
                <div className="box-images">
                    <Dropzone 
                        onFileUploaded={handleDrop}
                        selected={imageUrl}
                    />
                </div>
            </div>
            <div className="info col-sm-6">

                <div className="alerts">
                    <CustomAlert visible={showSucess} type="success" />
                    <CustomAlert visible={showError} type="danger" error={errors} />
                </div>

                <Form.Group as={Row} controlId="name" className="w-100">
                    <Form.Label column sm="4">Título da categoria: </Form.Label>
                    <Col sm="8">
                        <Form.Control placeholder="Título da categoria" required
                            onChange={(event) => setTitle(event.target.value)} 
                            value={title} 
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="description" className="w-100">
                    <Form.Label column sm="4">Descrição: </Form.Label>
                    <Col sm="8">
                        <Form.Control as="textarea" rows={5} placeholder="Descrição da categoria"
                            onChange={(event) => setDescription(event.target.value)} 
                            value={description} 
                        />
                    </Col>
                </Form.Group>
                {
                    loading ? <GifLoading /> :
                    <Form.Group as={Row} controlId="button" className="w-100">
                        <Button variant="dark" className="w-100" type="submit" >Salvar</Button>
                    </Form.Group>
                }
            </div>
        </Form>
    )
}

export default FormCategory;