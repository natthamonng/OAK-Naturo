import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import EditCategoryNameModal from './EditCategoryNameModal';
import DeleteCategoryModal from './DeleteCategoryModal';
import Moment from 'react-moment';

const CategoryListTable = ({ categories }) => {
    const [filter, setFilter] = useState('');

    // Filtered items
    const filteredCategories = categories.filter(category =>
        (category.categoryName).toLowerCase().includes(filter.toLowerCase()));

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Get current items to show
    const indexOfLastCategory = currentPage * itemsPerPage;
    const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
    const currentCategoriesToShow = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

    // Change page (called when page number clicked)
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const categoryList = currentCategoriesToShow.map((category, index) => {
        return (
            <tr key={`${category.id}-${index}`}>
                <td><Link to={`/documentation/categories/${category.id}`}>{ category.categoryName }</Link></td>
                <td><Moment format="DD/MM/YYYY">{ category.createdAt }</Moment></td>
                <td><Moment format="DD/MM/YYYY">{ category.updatedAt }</Moment></td>
                <td>
                    <div className="d-flex justify-content-center">
                        <EditCategoryNameModal category={category}/>
                        <div className="mx-1"></div>
                        <DeleteCategoryModal categoryId={category.id} />
                    </div>
                </td>
            </tr>
        )
    });

    return (
        <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-center flex-column flex-md-row">
                <h3 className="card-title col-md-8 mb-md-0">Liste des catégories</h3>
                <div className="form-group col-md-4">
                    <div className="input-group">
                        <div className="input-group-prepend">
                                <span className="input-group-text" id="filter-category">
                                    <i className="i-Folder-Search"></i>
                                </span>
                        </div>
                        <input className="form-control"
                               type="text" placeholder="rechercher..."
                               aria-label="filter-category" aria-describedby="filter-category"
                               value={filter}
                               onChange={e=> setFilter(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table dataTable-collapse text-center" id="category_table">
                        <thead>
                        <tr>
                            <th scope="col">Nom de catégorie</th>
                            <th scope="col">Créé</th>
                            <th scope="col">Modifié</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>

                        { categoryList }

                        </tbody>
                    </table>
                </div>

                { filteredCategories.length > itemsPerPage &&
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        total={filteredCategories.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                }

            </div>
        </div>
    )
};

export default CategoryListTable;