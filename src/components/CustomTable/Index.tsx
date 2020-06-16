import React from 'react';
import Pagination from '../Pagination/Index';

import './style.css'
import { Link } from 'react-router-dom';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { FaEdit } from 'react-icons/fa';

const CustomTable = ({ headers, array , route = "", paginationProps }) => {
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
                            <button type="button" onClick={() => console.log("removeu " + route + " - " + data.id)} className="btn btn-dark custon-link">
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