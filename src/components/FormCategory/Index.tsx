import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';

import './style.css';
import { Form, Row, Col, FormCheck, Button } from 'react-bootstrap';
import Dropzone from '../Dropzone/Index';
import ICategory from '../../interface/ICategory';
import IPropsFormCategory from '../../interface/IPropsFormCategory';
import api from '../../services/api';
import CustomAlert from '../Alert/Index';

const FormCategory : React.FC<IPropsFormCategory> = ({ category }) => {

    const [currentCategory, setCurrentCategory] = useState<ICategory>({} as ICategory);
    const [file, setFile] = useState<File>({} as File);  

    const [showSucess, setShowSucess] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    
    useEffect(() => {
        if (category) {
            setCurrentCategory(category);
        }
    }, [category]);

    function handleDrop(selectedFile: File[]) {
        console.log(selectedFile);
        setFile(selectedFile[0]);
        setCurrentCategory({
            ...currentCategory,
            image_url: ''
        })
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        setShowSucess(false);
        setShowError(false);
        setErrors([]);

        if (!file) {
            setErrors(["Insira uma imagem."]);
            setShowError(true);
            return;
        }

        const { title, available } = currentCategory;
        const data = new FormData();

        data.append("title", title);
        data.append('available', String(available));
        
        data.append('image', file);

        try {
            await api.post('categorys', data);
            setShowSucess(true);
            setCurrentCategory({} as ICategory);
        } catch (err) {
            setShowError(true);
            setErrors([err]);
        }
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setCurrentCategory({
            ...currentCategory, 
            available: !currentCategory.available
        });
    }

    return (
        <Form onSubmit={handleSubmit} encType="multipart/form-data"  className="form row">
            <div className="images col-sm-6">
                <div className="box-images">
                    <Dropzone onFileUploaded={handleDrop} multiple={false} />
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
                            onChange={(event) => setCurrentCategory({...currentCategory, title: event.target.value })} 
                            value={currentCategory.title} 
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="w-100">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8">
                        <Form.Check id="disponivel" type="checkbox">
                            <FormCheck.Input
                                onChange={handleChange}
                                checked={currentCategory.available} 
                            />
                            <Form.Check.Label>Categoria disponível</Form.Check.Label>
                        </Form.Check>
                    </div>
                </Form.Group>
                <Form.Group as={Row} controlId="button" className="w-100">
                    <Button variant="dark" className="w-100" type="submit" >Cadastrar</Button>
                </Form.Group>
            </div>
        </Form>
    )
}

export default FormCategory;