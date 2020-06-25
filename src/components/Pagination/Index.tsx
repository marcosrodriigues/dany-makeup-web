import React, { useEffect, useState } from 'react';

import './style.css';

const Pagination = ({ pageClick, initialPage = 1, totalRecords = 0, perPage = 5, maxPageShow = 7 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [countPages, setCountPages] = useState(1);
    const [listPages, setListPages] = useState<number[]>([]);
    const [isBeforeEnable, setIsBeforeEnable] = useState(false);
    const [isNextEnable, setIsNextEnable] = useState(false);

    const [firstPageShow, setFirstPageShow] = useState(1);
    const [lastPageShow, setLastPageShow] = useState(countPages);

    useEffect(() => {
        setCurrentPage(initialPage)
    }, [initialPage])

    useEffect(() => {
        setCountPages(Math.ceil(totalRecords / perPage));
    }, [totalRecords, perPage]);

    useEffect(() => {
        const half = Math.floor(maxPageShow / 2);
        let firstPage = currentPage - half;
        let lastPage = currentPage + half;

        if (lastPage < maxPageShow)
            lastPage = maxPageShow;

        if (currentPage == countPages)
            firstPage = countPages - half * 2;

        if (firstPage + half * 2 <= countPages)
            setFirstPageShow(firstPage > 0 ? firstPage : 1);
        
        setLastPageShow(lastPage > countPages ? countPages : lastPage);
    }, [currentPage, countPages])

    useEffect(() => {
        let count_pages: number[] = [];
        for (let i: number = 0; i < countPages; i++)
            count_pages.push(i + 1);
        
        setListPages(count_pages);
    }, [countPages])

    useEffect(() => {
        setIsNextEnable(currentPage !== countPages);
        setIsBeforeEnable(currentPage !== 1)
    }, [currentPage, countPages])

    function handleClick(page: number) {
        if (page < 1 || page > countPages) return;
        setCurrentPage(page);
        pageClick(page);
    }
    return (
        <nav className="bg-dark">
            <ul className="paginator justify-content-center bg-dark">
                <li className={`page-item ${!isBeforeEnable && "disable"}`} onClick={() => handleClick(currentPage -1)}>
                    <a className="page-link" tabIndex={-1}>Anterior</a>
                </li>
                {
                    firstPageShow !== 1 &&
                    <li className="page-item" onClick={() => handleClick(1)}>
                        <a className="page-link" tabIndex={-1}>...</a>
                    </li>
                }
                {
                    listPages.map(numberPage => {
                        if (numberPage < firstPageShow) return;
                        if (numberPage > lastPageShow) return;

                        let className = 'page-item'

                        if (numberPage === currentPage) className = className + " active"

                        return (
                            <li key={numberPage} className={className} onClick={() => handleClick(numberPage)}>
                                <a className="page-link">{numberPage}</a>
                            </li>
                        )
                    })
                }
                {
                    lastPageShow !== countPages &&
                    <li className="page-item" onClick={() => handleClick(countPages)}>
                        <a className="page-link" tabIndex={-1}>...</a>
                    </li>
                }
                <li className={`page-item ${!isNextEnable && "disable"}`} onClick={() => handleClick(currentPage + 1)}>
                    <a className="page-link">Proximo</a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination;