import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Pagination from './Pagination';

const CategoryList = () => {
    const role = useSelector(state => state.auth.user.role);
    const categories = useSelector(state => state.documentation.categoryList);

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Get current items to show
    const indexOfLastCategory = currentPage * itemsPerPage;
    const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
    const currentCategoriesToShow = categories.slice(indexOfFirstCategory, indexOfLastCategory);

    // Change page (called when page number clicked)
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const categoryList = currentCategoriesToShow.map((category, index) => {
        return (
            <Link to={`/documentation/categories/${category.id}`} key={`${category.id}-${index}`}
                  className="col-lg-6 col-md-12 mb-4">
                <div className="p-4 border border-light rounded d-flex align-items-center">
                    <i className="i-Folder text-32 mr-3"></i>
                    <div>
                        <h4 className="text-18 mb-1">{category.categoryName}</h4>
                    </div>
                </div>
            </Link>
        )
    });

    return (
        <div className="card mb-4">
            <div className="card-body">
                <div className="card-title m-0">Catégories</div>
                <div className="row mt-3">

                    { categoryList }

                </div>

                { categories.length > itemsPerPage &&
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        total={categories.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                }

                { role === "admin" &&
                <Link to="/documentation/manage-category" className="text-small text-muted font-italic float-right">
                    <i className="i-Folder-Add-"></i> Ajouter une catégorie
                </Link>
                }

            </div>
        </div>
    )
};

export default CategoryList;