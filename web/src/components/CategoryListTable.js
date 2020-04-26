import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Pagination from './Pagination';

const CategoryListTable = () => {
    const categories = useSelector(state => state.documentation.categoryList);

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Get current items to show
    const indexOfLastCategory = currentPage * itemsPerPage;
    const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
    const currentCategoriesToShow = categories.slice(indexOfFirstCategory, indexOfLastCategory);

    // Change page (called when page number clicked)
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const categoryList = currentCategoriesToShow.map((category, index) => {
        return (
            <tr key={`${category.id}-${index}`}>
                <td>{ category.categoryName }</td>
                <td><span className="badge badge-outline-primary">Activé</span></td>
                <td>
                    <a className="text-primary mr-2" href="#">
                        <i className="nav-icon i-Pen-2 font-weight-bold"></i>
                    </a>
                    <a className="text-danger mr-2" href="#">
                        <i className="nav-icon i-Close-Window font-weight-bold"></i>
                    </a>
                </td>
            </tr>
        )
    });

    return (
        <div className="card mb-4">
            <div className="card-header d-flex align-items-center">
                <h3 className="w-50 float-left card-title m-0">Liste des catégories</h3>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table dataTable-collapse text-center" id="category_table">
                        <thead>
                        <tr>
                            <th scope="col">Nom de catégorie</th>
                            <th scope="col">Status(WIP)</th>
                            <th scope="col">Action(WIP)</th>
                        </tr>
                        </thead>
                        <tbody>

                        { categoryList }

                        </tbody>
                    </table>
                </div>

                { categories.length > itemsPerPage &&
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        total={categories.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                }

            </div>
        </div>
    )
};

export default CategoryListTable;