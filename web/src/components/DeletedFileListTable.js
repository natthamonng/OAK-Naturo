import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreFile } from '../actions/documentation.actions';
import Moment from 'react-moment';

const DeletedFileListTable = () => {
    const dispatch = useDispatch();
    const deletedFiles = useSelector(state => state.documentation.deletedFiles);
    const deletedFileList = deletedFiles.map((file, index) => {
        return (
            <tr key={`${file.id}-${index}`}>
                <th scope="row">{index +1}</th>
                <td>{ file.title }</td>
                <td>{ file.category.categoryName }</td>
                <td>{ file.author.username }</td>
                <td><Moment format="DD/MM/YYYY">{ file.createdAt }</Moment></td>
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
        return (
            <div className="d-flex align-items-center justify-content-center" style={{minHeight: '50vh'}}>
                <h1 className="text-mute">
                    <i className="i-Inbox-Empty"></i>{' '} Votre corbeille est vide.
                </h1>
            </div>
        )
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
                                <th scope="col">#</th>
                                <th scope="col">Nom de fichier</th>
                                <th scope="col">Catégorie</th>
                                <th scope="col">Auteur</th>
                                <th scope="col">Créé</th>
                                <th scope="col">Restaurer</th>
                            </tr>
                            </thead>
                            <tbody>

                            { deletedFileList }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
};

export default DeletedFileListTable;