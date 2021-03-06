import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { restoreFile } from '../actions/documentation.actions';
import Moment from 'react-moment';
import Pagination from './Pagination';

const DeletedFileListTable = ({ deletedFiles }) => {
    const dispatch = useDispatch();

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Get current items to show
    const indexOfLastFile = currentPage * itemsPerPage;
    const indexOfFirstFile = indexOfLastFile - itemsPerPage;
    const currentDeletedFilesToShow = deletedFiles.slice(indexOfFirstFile, indexOfLastFile);

    // Change page (called when page number clicked)
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const deletedFileList = currentDeletedFilesToShow.map((file, index) => {
        return (
            <tr key={`${file.id}-${index}`}>
                <td>{ file.title }</td>
                <td>{ file.category.categoryName }</td>
                <td>{ file.author.username }</td>
                <td><Moment format="DD/MM/YYYY">{ file.createdAt }</Moment></td>
                <td><Moment format="DD/MM/YYYY">{ file.updatedAt }</Moment></td>
                <td>
                    <div className="text-primary mr-2" style={{cursor: 'pointer'}}
                         onClick={()=> dispatch(restoreFile(file.category.id, file.id))}>
                        <i className="nav-icon i-Inbox-Out font-weight-bold"></i>
                    </div>
                </td>
            </tr>
        )
    });

    if (deletedFileList.length === 0) {
        return null;
    } else {
        return (
            <div className="card mb-4">
                <div className="card-header d-flex align-items-center">
                    <h3 className="w-50 float-left card-title m-0">Liste des fichiers supprimés</h3>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table dataTable-collapse text-center" id="category_table">
                            <thead>
                            <tr>
                                <th scope="col">Nom de fichier</th>
                                <th scope="col">Catégorie</th>
                                <th scope="col">Auteur</th>
                                <th scope="col">Créé</th>
                                <th scope="col">Modifié</th>
                                <th scope="col">Restaurer</th>
                            </tr>
                            </thead>
                            <tbody>

                            { deletedFileList }

                            </tbody>
                        </table>
                    </div>
                    <small className="text-muted">* Les fichiers associés aux catégories supprimées n'apparaissent pas ici.</small>
                </div>
                { deletedFiles.length > itemsPerPage &&
                <Pagination
                    itemsPerPage={itemsPerPage}
                    total={deletedFiles.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
                }
            </div>
        )
    }
};

export default DeletedFileListTable;