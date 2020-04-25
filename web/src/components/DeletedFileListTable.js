import React from 'react';
import {useSelector} from 'react-redux';
import Moment from 'react-moment';

const DeletedFileListTable = () => {
    const deletedFiles = useSelector(state => state.documentation.deletedFiles);
    const deletedFileListList = deletedFiles.map((file, index) => {
        return (
            <tr key={`${file.id}-${index}`}>
                <th scope="row">{index +1}</th>
                <td>{ file.title }</td>
                <td>{ file.category.categoryName }</td>
                <td>{ file.author.username }</td>
                <td><Moment format="DD/MM/YYYY">{ file.updatedAt }</Moment></td>
                <td>
                    <a className="text-primary mr-2" href="#">
                        <i className="nav-icon i-Inbox-Out font-weight-bold"></i>
                    </a>
                </td>
            </tr>
        )
    });

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
                            <th scope="col">#</th>
                            <th scope="col">Nom de fichier</th>
                            <th scope="col">Catégorie</th>
                            <th scope="col">Auteur</th>
                            <th scope="col">Modifié</th>
                            <th scope="col">Restaurer(WIP)</th>
                        </tr>
                        </thead>
                        <tbody>

                        { deletedFileListList }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default DeletedFileListTable;