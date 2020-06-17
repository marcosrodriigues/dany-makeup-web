import React from 'react';
import Pagination from '../Pagination/Index';

import './style.css'
import { Link } from 'react-router-dom';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { FaEdit } from 'react-icons/fa';
import api from '../../services/api';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import ConfirmAlert from '../ConfirmAlert/Index';

const CustomTable = ({ headers, array , route = "", routeApi = "", paginationProps, onRemove = () => { } }) => {
    
    
    async function handleRemoveClick(id: number, name: string = "") {
        if (id === 0 || route === "") return;

        confirmAlert({
            customUI: ({ onClose }) =>  {
                console.log(onClose);
                return (
                    <ConfirmAlert
                        title={"Remover fabricante"}
                        message={`Deseja confirmar a exclusão do fabricante?`}
                        name={name}
                        onClose={onClose}
                        onClickYes={() => {
                            handleDelete(id);
                            onClose();
                        }}
                    />
                )
            }
        })
    }

    async function handleDelete(id) {
        try {
            await api.delete(`${routeApi}/${id}`);
        } catch (err) {
            console.log(err);
        }
        onRemove();
    }

    return (
        <table className="table table-dark table-striped table-hover">
            <thead>
                <tr>
                    {
                    headers.map((header, index) => (
                        <th key={index} scope='col' className={`table-col-${index}`}>{header}</th>
                    ))
                    }
                    <th scope='col' className={`table-options`}>Opções</th>
                </tr>
            </thead>
            <tbody>
                {
                    array.length > 0 ?
                        array.map((data, index) => (
                    <tr key={index}>
                        {Object.keys(data).map((key, i) => (
                            <td key={i} className={`table-col-${i}`}>
                                {String(data[key]).startsWith('http') ?
                                    <img src={data[key]} alt={data[key]} width="100%" height="120px" />
                                :
                                data[key]
                                }
                            </td>
                        ))}
                        <td className="td-options">
                            <button type="button" className="btn btn-dark">
                                <Link to={`/${route}/${data.id}`} className="custom-link" >
                                    <FaEdit size={18} />
                                </Link>
                            </button>
                            <button type="button" onClick={() => handleRemoveClick(data.id, data.name)} className="btn btn-dark custon-link">
                                <IoIosCloseCircleOutline className="custom-link" size={24} />
                            </button>
                        </td>
                    </tr>
                ))
                :
                <tr>
                    <td colSpan={headers.length + 1} className="centered">
                        Nenhum item cadastrado
                    </td>
                </tr>
                }
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={headers.length + 1}>
                        <Pagination 
                            pageClick={paginationProps.click} 
                            initialPage={paginationProps.currentPage}
                            totalRecords={paginationProps.count}
                            perPage={paginationProps.limitPerPage}
                        />
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}

export default CustomTable;