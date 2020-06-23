import React from 'react';
import { FiXCircle } from 'react-icons/fi';
import IFile from '../../interface/IFile';
import { getFilename } from '../../util/util';

import './style.css'

interface Props {
    list_images: IFile[],
    selected: string,
    onSelectedImage: (url: string, filename: string) => void
    setListImages: (images: IFile[]) => void
}
const Thumbnails:React.FC<Props> = ({ list_images = [], selected="", onSelectedImage, setListImages }) => {
    function handleRemoveFile(url: string) {
        const filtered = list_images.filter(f => f.url !== url);

        if (filtered.length < 1) {
            onChangeSelectedFile("","");
            setListImages(filtered);
            return;
        }

        if (url === selected) 
            onChangeSelectedFile(filtered[0].url, filtered[0].file.name);

        setListImages(filtered);
    }

    function onChangeSelectedFile(url: string, filename: string) {
        if (url.startsWith("blob")) {
            onSelectedImage(url, filename);
        } else {
            onSelectedImage(url, url);
        }
    }

    return (
        <div className="thumbnail">
            <p>
                Imagens adicionadas aparecerão aqui. <br />
                <small>Selecione a imagem principal</small>
            </p>
            
            <div className="list-images row col-sm-12">
                {
                    list_images && list_images.map(({ file, url }, index) => {
                        let className = "each-box col-sm-4 ";

                        if (url === selected) className = className + " selected";

                        const filename = file.name ? file.name : getFilename(url);

                        return (
                            <div 
                                key={index}
                                className={className}
                            >
                                <button type="button" onClick={() => handleRemoveFile(url)} className="btn-remove">
                                    <FiXCircle size={24} title="Remover imagem"  />
                                </button>
                                
                                <div className="each-image" onClick={() => onChangeSelectedFile(url, filename)}>
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
    )
}

export default Thumbnails;