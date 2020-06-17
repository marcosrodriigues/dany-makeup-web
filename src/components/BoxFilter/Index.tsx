import React, { useEffect } from 'react';

import './style.css'
import { FaSearch } from 'react-icons/fa';

const BoxFilter = ({ limitPerPage = 5, onChangeLimitPerPage, onSubmit, fieldProps}) => {

    useEffect(() => {

    }, [])

    return (
        <fieldset>
            <form onSubmit={onSubmit} className="form-inline centered">
                <div className="centered w-100 row ml-0">
                    <div className="col-sm-2">
                        <span className="text-filter text-gold">Filtre por:</span>
                    </div>
                    <div className="col-sm-6">
                        {
                            fieldProps && fieldProps.map((item, index) => {
                                return (
                            <input 
                                key={index}
                                id="name" 
                                placeholder="Nome" 
                                className="form-control bg-gold filter-input"
                                onChange={event => item.setValue(event.target.value)}
                                value={item.value} 
                            />
                                )
                            })
                        }
                    </div>
                    <div className="col-sm-3">
                        <select className="form-control bg-gold filter-input" value={limitPerPage} onChange={onChangeLimitPerPage}>
                            <option disabled>Exibir de:</option>
                            <option value={5}>Exibir de 5 e 5</option>
                            <option value={10}>Exibir de 10 em 10</option>
                            <option value={15}>Exibir de 15 em 15</option>
                            <option value={20}>Exibir de 20 em 20</option>
                            <option value={25}>Exibir de 25 em 25</option>
                            <option value={50}>Exibir de 50 em 50</option>
                        </select>
                    </div>
                    <div className="col-sm-1">
                        <button type="submit" className="btn btn-dark right">
                            <FaSearch></FaSearch>
                        </button>
                    </div>
                    
                </div>
            </form>
        </fieldset>
    )
}

export default BoxFilter;