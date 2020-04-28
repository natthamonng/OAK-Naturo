import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreCategoryAndItsFiles } from '../actions/documentation.actions';
import Moment from 'react-moment';
import Pagination from "./Pagination";

const DeletedCategoryListTable = () => {
    const dispatch = useDispatch();
    const deletedCategories = useSelector(state => state.documentation.deletedCategories);

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Get current items to show
    const indexOfLastCategory = currentPage * itemsPerPage;
    const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
    const currentDeletedCategoriesToShow = deletedCategories.slice(indexOfFirstCategory, indexOfLastCategory);

    // Change page (called when page number clicked)
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const deletedCategoryList = currentDeletedCategoriesToShow.map((category, index) => {
        return (
            <tr key={`${category.id}-${index}`}>
                <td>{ category.categoryName }</td>
                <td><Moment format="DD/MM/YYYY">{ category.createdAt }</Moment></td>
                <td><Moment format="DD/MM/YYYY">{ category.updatedAt }</Moment></td>
                <td>
                    <div className="text-primary mr-2" style={{cursor: 'pointer'}}
                         onClick={()=> dispatch(restoreCategoryAndItsFiles(category.id))}>
                        <i className="nav-icon i-Inbox-Out font-weight-bold"></i>
                    </div>
                </td>
            </tr>
        )
    });

    if (deletedCategoryList.length === 0) {
        return null;
    } else {
        return (
            <div className="card mb-4">
                <div className="card-header d-flex align-items-center">
                    <h3 className="w-50 float-left card-title m-0">Liste des catégories supprimées</h3>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table dataTable-collapse text-center" id="category_table">
                            <thead>
                            <tr>
                                <th scope="col">Nom de catégorie</th>
                                <th scope="col">Créé</th>
                                <th scope="col">Modifié</th>
                                <th scope="col">Restaurer</th>
                            </tr>
                            </thead>
                            <tbody>

                            { deletedCategoryList }

                            </tbody>
                        </table>
                    </div>
                    <small className="text-muted">* La reatauration des catégories supprimées va récupérer tous les fichiers associés.</small>
                </div>
                { deletedCategories.length > itemsPerPage &&
                <Pagination
                    itemsPerPage={itemsPerPage}
                    total={deletedCategories.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
                }
            </div>
        )
    }
};

export default DeletedCategoryListTable;