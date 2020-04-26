import React from 'react';

export default function Pagination({itemsPerPage, total, paginate, currentPage}) {
    const pageNumbers = [];

    for (let i=1; i <= Math.ceil(total/itemsPerPage); i++ ) {
        pageNumbers.push(i)
    }

    return (
        <div className="d-flex justify-content-center">
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {pageNumbers.map(number => (
                        <li key={number} className={`page-item ${currentPage === number ? 'active ' : ''}`}>
                            <div onClick={() => paginate(number)}
                                 className="page-link">
                                {number}
                            </div>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}