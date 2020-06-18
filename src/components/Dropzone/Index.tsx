import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiXCircle } from 'react-icons/fi';

import './style.css'

interface Props {
    onFileUploaded: (file: File[]) => void,
    onChangeSelected: (filename: string) => void,
    setThumbnails?: (thumbs: string[]) => void
    multiple?: boolean,
    thumbnails?: string[],
    selected?: string,
    array_images?: string[]
}

interface IFile {
    file: File,
    url: string,
}
const Dropzone:React.FC<Props> = (
    {   onFileUploaded, 
        onChangeSelected,
        setThumbnails,
        multiple = true, 
        thumbnails = [] ,
        selected = "",
    }) => {

    const MAX_SIZE = 5242880;
    const ACCEPTED_FILES = "image/*"

    const [myFiles, setMyFiles] = useState<IFile[]>([] as IFile[])
    const [selectedUri, setSelectedUri] = useState<string>("");
    
    const onDrop = useCallback((accepted:File[]) => {
        const my_files: IFile[] = accepted.map((each:File) => {
            const fileUrl = URL.createObjectURL(each);
            const my_file = {
                file: each, url: fileUrl
            };
            
            return my_file;
        })

        const files = my_files
            .map(f => (f.file));

        if (!multiple) {
            onChangeSelected(my_files[0].url);
            onFileUploaded(files)
            return;;
        }

        myFiles.map(f => {
            my_files.push(f);
        })

        var pushed = my_files;
        
        console.log(pushed, my_files, myFiles)

        setMyFiles(pushed);
        onFileUploaded(files); 
    }, [onFileUploaded]);
    
    useEffect(() => {
        if (thumbnails && multiple) {
            const initials: IFile[]  = thumbnails.map(url_image => ({ file: {} as File, url: url_image }));
            setMyFiles(initials);
        }
    }, [thumbnails, multiple])

    useEffect(() => {
        if (selected.startsWith('http://'))
            setSelectedUri(selected);
    }, [selected])

    const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
        accept: ACCEPTED_FILES,
        onDrop,
        minSize: 0,
        maxSize: MAX_SIZE,
        multiple: true,
    })

    function getFilename(url : string) {
        if (url.startsWith("http")) {
            return String(url).substring(String(url).lastIndexOf('/') + 1, url.length) 
        }
        return url;
    }

    function handleRemoveFile(url: string) {
        const filtered = myFiles.filter(f => f.url !== url);

        if (url === selectedUri) onChangeSelected(filtered[0].url);

        setMyFiles(filtered);

        if (setThumbnails)
            setThumbnails(filtered.map(f => f.url));
    }

    function onChangeSelectedFile(url: string, filename: string) {
        setSelectedUri(url);
        if (filename == undefined) filename = url;
        onChangeSelected(filename);
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
                            {isFileTooLarge && "Arquivo é muito pesado, tamanho máximo permitido: 500kb"}
                        </>
                    }
                </p>
                }
            </div>
            <button type="button" onClick={() => console.log(myFiles)}>
                EXIBIR MYFILES
            </button>
            { multiple &&  
                <div className="thumbnail">
                    <p>
                        Imagens adicionadas aparecerão aqui. <br />
                        <small>Selecione a imagem principal do produto</small>
                    </p>
                    
                    <div className="list-images row col-sm-12">
                        {
                            myFiles && myFiles.map(({ file, url }, index) => {
                                let className = "each-box col-sm-4 ";
    
                                if (url === selectedUri) className = className + " selected";

                                const filename = file.name ? file.name : getFilename(url);

                                return (
                                    <div 
                                        key={index}
                                        className={className}
                                    >
                                        <button type="button" onClick={() => handleRemoveFile(url)} className="btn-remove">
                                            <FiXCircle size={24} title="Remover imagem"  />
                                        </button>
                                        
                                        <div className="each-image" onClick={() => onChangeSelectedFile(url, file.name)}>
                                            <img src={url} className="image" alt="thumbnail" width="100%"  />
                                            <p className="centered" key={index}>
                                                {filename}
                                            </p>
                                        </div>
                                        
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