import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Pagination from './Pagination';
import EditCategoryNameModal from './EditCategoryNameModal';
import DeleteCategoryModal from './DeleteCategoryModal';

const CategoryListTable = () => {
    const categories = useSelector(state => state.documentation.categoryList);
    const loading = useSelector(state => state.documentation.editCategoryLoading);

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
                <td>
                    { category.categoryName }
                </td>
                <td>
                    <EditCategoryNameModal category={category}/>
                </td>
                <td>
                    <DeleteCategoryModal categoryId={category.id} />
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
                            <th scope="col">Modifier</th>
                            <th scope="col">Supprimer</th>
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