import React from 'react';

import './style.css'

const GifLoading = () => {
    return (
        <div className="gif-loading">
            <img src={require('../../assets/loading.gif')} alt="carregando..." />
        </div>
    )
}

export default GifLoading;