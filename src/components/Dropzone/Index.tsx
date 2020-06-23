import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './style.css'
import IFile from '../../interface/IFile';

interface Props {
    onFileUploaded: (file: IFile[]) => void,
    selected: string
}
const Dropzone:React.FC<Props> = (
    {   onFileUploaded, 
        selected = "",
    }) => {

    const MAX_SIZE = 5242880;
    const ACCEPTED_FILES = "image/*"

    const onDrop = useCallback((accepted:File[]) => {
        const my_files: IFile[] = accepted.map((each:File) => {
            const fileUrl = URL.createObjectURL(each);
            const my_file = {
                file: each, url: fileUrl
            };
            
            return my_file;
        })

        onFileUploaded(my_files); 
    }, [onFileUploaded]);

    const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
        accept: ACCEPTED_FILES,
        onDrop,
        minSize: 0,
        maxSize: MAX_SIZE,
        multiple: true,
    })

    const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > MAX_SIZE;

    return (
        <div>
            <div { ...getRootProps()} className="dropzone">
                <input { ...getInputProps()} accept={ACCEPTED_FILES} />
                {
                <p> 
                    { 
                    selected ?
                        <img src={selected} alt="Imagem escolhida" />
                    :
                        <>
                            <FiUpload />
                            {!isDragActive && 'Clique ou arraste as imagens aqui'}
                            {isDragActive && !isDragReject && "Solte a imagem."}
                            {isDragReject && "Tipo de arquivo não permitido!"}
                            {isFileTooLarge && "Arquivo é muito pesado, tamanho máximo permitido: 500kb"}
                        </>
                    }
                </p>
                }
            </div>
        </div>
    )
}

export default Dropzone;