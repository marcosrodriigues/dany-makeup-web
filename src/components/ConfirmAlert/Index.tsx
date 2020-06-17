import React, { useEffect } from 'react'

import './style.css';

const ConfirmAlert = ({ 
        title = "Modal de confirmação",
        message = "Você não vai clicar no botão 'sim'",
        id = 0,
        name = "Modal",
        onClose = () => { },
        onClickYes = (id: number) => ( console.log("Clicou SIM para o id " + id))
    }) => {
    function handleClickYes(id: number) {
        onClickYes(id);
    }

    function handleOnClose() {
        onClose();
    }
    return (
        <div className="confirm-container">
            <div className="confirm-modal">
                <div className="confirm-box-title">
                    <p className="confirm-text-title">
                        {title} - {name}

                        <button className="confirm-button-span span-exit" onClick={handleOnClose}>
                        <span>&times;</span>
                        </button>
                    </p>
                </div>
                <div className="confirm-box-message">
                    <p className="confirm-text-message">
                        {message}
                    </p>
                </div>
                <div className="confirm-box-buttons">
                    <div className="float-right">
                        <button
                            type="button"
                            className="btn btn-dark"
                            onClick={() => handleClickYes(id)}    
                        >
                                Sim
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary btn-cancel"
                            onClick={handleOnClose}
                        >
                                Não
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmAlert;