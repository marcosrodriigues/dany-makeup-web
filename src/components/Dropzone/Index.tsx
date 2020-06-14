import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './style.css'

interface Props {
    onFileUploaded: (file: File[]) => void,
    onSelectMainFile?: (filename: string) => void,
    multiple?: boolean,
    array_image?: string[],
    selected?: string
}
const Dropzone:React.FC<Props> = ( { onFileUploaded, 
                                    multiple = true, 
                                    onSelectMainFile = () => {}, 
                                    array_image = [] ,
                                    selected = ""
                                } ) => {

    const MAX_SIZE = 5242880;
    const ACCEPTED_FILES = "image/*"

    const [files, setFiles] = useState<File[]>([] as File[]);
    const [urls, setUrls] = useState<string[]>([]);

    const [selectedUri, setSelectedUri] = useState<string>("");
    
    const onDrop = useCallback(async (accepted:File[]) => {
        accepted.map((each:File) => {
            const fileUrl = URL.createObjectURL(each);

            if (multiple) {
                files.push(each);
                urls.push(fileUrl);
    
                setFiles([...files]);
                setUrls([...urls]);
            } else {
                let files_pushed = files;
                let urls_pushed = urls;

                if (files_pushed.length > 0) {
                    files_pushed = [];
                    urls_pushed = [];
                }

                files_pushed.push(each);
                setFiles([...files_pushed]);

                urls_pushed.push(fileUrl);
                setUrls([...urls_pushed])
                setSelectedUri(fileUrl);
            }

            return fileUrl;
        })
    }, [onFileUploaded]);
    
    useEffect(() => {
        onFileUploaded(files);  
    }, [files]);
    
    useEffect(() => {
        if (multiple) {
            const images = array_image.map(img => { return img });
            setSelectedUri(selected);
            setUrls(images);
        } else {
            if (array_image[0] !== "")
                setSelectedUri(array_image[0]);
        }

    }, [array_image])

    const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
        accept: ACCEPTED_FILES,
        onDrop,
        minSize: 0,
        maxSize: MAX_SIZE,
        multiple: true
    })

    function handleClickMainImage(selectedFileUrl: string, selectedFileName: string) {
        setSelectedUri(selectedFileUrl);
        onSelectMainFile(selectedFileName);
    }

    const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > MAX_SIZE;

    return (
        <div>
            <div { ...getRootProps()} className="dropzone">
                <input { ...getInputProps()} accept={ACCEPTED_FILES} />
                {
                <p> 
                    { 
                    selectedUri ?
                        <img src={selectedUri} alt="Imagem escolhida" />
                    :
                        <>
                            <FiUpload />
                            {!isDragActive && 'Clique ou arraste as imagens aqui'}
                            {isDragActive && !isDragReject && "Solte a imagem."}
                            {isDragReject && "Tipo de arquivo não permitido!"}
                            {isFileTooLarge && "Arquivo é muito pesado!"}
                        </>
                    }
                </p>
                }
                
            </div>
            { multiple && 
                <div className="thumbnail">
                    <p>
                        Imagens adicionadas aparecerão aqui. <br />
                        <small>Selecione a imagem principal do produto</small>
                    </p>
                    
                    <div className="list-images row col-sm-12">
                        {
                        files.length > 0 ?
                            files.map((file, index) => {
                                let className = "each-image col-sm-4 ";

                                if (urls[index] === selectedUri)
                                    className = className + " selected";

                                return (
                                    <div 
                                        onClick={() => handleClickMainImage(urls[index], file.name)}
                                        key={index}
                                        className={className}
                                    >
                                        <img src={urls[index]} className="image" alt="thumbnail" width="100%" height="100%" />
                                        <p className="centered">{file.name}</p>
                                    </div>
                                )
                            })
                        :
                        urls.length > 0 &&
                        urls.map((url_image, index) => {
                            let className = "each-image col-sm-4 ";

                            if (url_image === selectedUri)
                                className = className + " selected";

                            return (
                                <div 
                                    onClick={() => handleClickMainImage(url_image, url_image)}
                                    key={index}
                                    className={className}
                                >
                                    <img src={url_image} className="image" alt="thumbnail" width="100%"  />
                                    <p className="centered" key={index}>
                                        {String(url_image).substring(String(url_image).lastIndexOf('/') + 1, url_image.length)}
                                    </p>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            }
            
            
        </div>
        
    )
}

export default Dropzone;