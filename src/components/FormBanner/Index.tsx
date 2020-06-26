import React, { useState, useEffect, FormEvent } from 'react';

import './style.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Dropzone from '../Dropzone/Index';
import api from '../../services/api';
import CustomAlert from '../CustomAlert/Index';
import IFile from '../../interface/IFile';

import DatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/esm/locale/pt-BR';
import IBanner from '../../interface/IBanner';
registerLocale('pt', pt)

const FormBanner = ({ banner = { } as IBanner }) => {

    const [id, setId] = useState<number>(0);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000));
    
    const [file, setFile] = useState<File>({} as File);  

    const [showSucess, setShowSucess] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    

    useEffect(() => {
        if (banner.id !== undefined) {
            setId(banner.id);
            setName(banner.name);
            setDescription(banner.description);
            setImageUrl(banner.image_url);
            setStart(new Date(banner.start));
            setEnd(new Date(banner.end));
        } 
    }, [banner])

    function handleDrop(selectedFile: IFile[]) {
        setFile(selectedFile[0].file);
        setImageUrl(selectedFile[0].url);
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        setShowSucess(false);
        setShowError(false);
        setErrors([]);

        if (!file || imageUrl === "") {
            setErrors(["Insira uma imagem."]);
            setShowError(true);
            return;
        }

        const data = new FormData();

        data.append('id', String(id));
        data.append("name", name);
        data.append("description", description);
        data.append('start', String(start));
        data.append('end', String(end));
        
        if (!imageUrl.startsWith("blob"))
            data.append("image_url", imageUrl);

        data.append('image', file);

        try {
            if (id !== 0) await api.put('banners', data)
            else await api.post('banners', data);

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
                    <Form.Label column sm="4">Nome do banner: </Form.Label>
                    <Col sm="8">
                        <Form.Control placeholder="Nome do banner" required
                            onChange={(event) => setName(event.target.value)} 
                            value={name} 
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="description" className="w-100">
                    <Form.Label column sm="4">Descrição: </Form.Label>
                    <Col sm="8">
                        <Form.Control as="textarea" rows={5} placeholder="Descrição do banner"
                            onChange={(event) => setDescription(event.target.value)} 
                            value={description} 
                        />
                    </Col>
                </Form.Group>
                <div className="form-group row w-100">
                    <label htmlFor="start" className="col-form-label col-sm-4">Inicio da exibição:</label>
                    <div className="col-sm-8">
                        <DatePicker
                            id="start"
                            selected={start}
                            onChange={(date: Date) => setStart(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            locale="pt"
                            timeIntervals={30}
                            timeCaption="Hora"
                            dateFormat="dd/MM/yyyy hh:mm aa"
                            className="form-control col-sm-12"
                            placeholderText="Início do banner"
                        />
                    </div>
                </div>
                <div className="form-group row w-100">
                    <label htmlFor="end" className="col-form-label col-sm-4">Fim da exibição:</label>
                    <div className="col-sm-8">
                        <DatePicker
                            id="end"
                            selected={end}
                            onChange={(date: Date) => setEnd(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            locale="pt"
                            timeIntervals={30}
                            minDate={start}
                            timeCaption="Hora"
                            dateFormat="dd/MM/yyyy hh:mm aa"
                            className="form-control col-sm-12"
                            placeholderText="Fim do banner"
                        />
                    </div>
                </div>
                <Form.Group as={Row} controlId="button" className="w-100">
                    <Button variant="dark" className="w-100" type="submit" >Salvar</Button>
                </Form.Group>
            </div>
        </Form>
    )
}

export default FormBanner;