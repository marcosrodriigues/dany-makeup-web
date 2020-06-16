import React, { useEffect, useState } from 'react';

import './style.css';

const Pagination = ({ pageClick, initialPage = 1, totalRecords = 0, perPage = 5 }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [countPages, setCountPages] = useState(1);
    const [listPages, setListPages] = useState<number[]>([]);
    const [isBeforeEnable, setIsBeforeEnable] = useState(false);
    const [isNextEnable, setIsNextEnable] = useState(false);

    useEffect(() => {
        setCurrentPage(initialPage)
    }, [])

    useEffect(() => {
        setCountPages(Math.ceil(totalRecords / perPage));
    }, [totalRecords, perPage]);

    function handleClick(page: number) {
        if (page < 1 || page > countPages) return;
        setCurrentPage(page);
        pageClick(page);
    }

    useEffect(() => {
        setIsNextEnable(currentPage !== countPages);
        setIsBeforeEnable(currentPage !== 1)
    }, [currentPage, countPages])

    useEffect(() => {
        
        let count_pages: number[] = [];
        for (let i: number = 0; i < countPages; i++)
            count_pages.push(i + 1);
        
        setListPages(count_pages);
    }, [countPages])

    return (
        <nav className="bg-dark">
            <ul className="paginator justify-content-center bg-dark">
                <li className={`page-item ${!isBeforeEnable && "disable"}`} onClick={() => handleClick(currentPage -1)}>
                    <a className="page-link" tabIndex={-1}>Anterior</a>
                </li>
                {
                    
                    listPages.map(numberPage => {
                        let className = 'page-item'

                        if (numberPage === currentPage) className = className + " active"

                        return (
                            <li key={numberPage} className={className} onClick={() => handleClick(numberPage)}>
                                <a className="page-link">{numberPage}</a>
                            </li>
                        )
                    })
                }
                <li className={`page-item ${!isNextEnable && "disable"}`} onClick={() => handleClick(currentPage + 1)}>
                    <a className="page-link">Proximo</a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination;