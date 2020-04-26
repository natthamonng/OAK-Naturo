import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFile } from '../actions/documentation.actions';
import Moment from 'react-moment';

const FileList = (props) => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    let fileList;
    if (props.files) {
        fileList = props.files.map(file => {
            return (
                <div key={file.id} className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between mb-2">
                        <Link to={`/documentation/categories/${file.category_id}/files/${file.id}`}>
                            <h5 className="mb-1">{file.title}</h5>
                        </Link>
                    </div>
                    <div className="d-flex">
                        <div className="flex-column">
                            <small className="text-small"><strong>Auteur:</strong> {file.author.username}</small>
                            <div className="mx-2"></div>
                            <small className="text-small"><strong>Modifié:</strong> {' '}
                                <Moment format="DD/MM/YYYY">{file.updatedAt}</Moment>
                            </small>
                        </div>
                        <div className="flex-grow-1"></div>
                        { user.role === 'admin' &&
                            <div className="d-flex align-items-end">
                                <small style={{cursor: 'pointer'}} className="text-danger"
                                       onClick={()=> dispatch(removeFile(file.category_id, file.id))}>
                                    <i className="i-Close"></i> Supprimer
                                </small>
                            </div>
                        }
                    </div>
                </div>
            )
        });
    }


    if (fileList.length === 0) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center" style={{minHeight: '50vh'}}>
                <h1 className="text-muted">
                    <i className="i-Folder"></i>{' '} Cette catégorie est vide.
                </h1>

                <Link to="/documentation/create-file"
                      className="text-small text-muted font-italic mt-4">
                    <i className="i-File-Edit"></i> <ins>Créer un fichier</ins>
                </Link>
            </div>
        )
    } else {
        return (
            <div className="card text-left">
                <div className="card-body">
                    <h4 className="card-title mb-4">Liste des fichiers: </h4>
                    <div className="list-group">
                        { fileList }
                    </div>
                    <Link to="/documentation/create-file"
                          className="text-small text-muted font-italic float-right mt-4">
                        <i className="i-File-Edit"></i> Créer un fichier
                    </Link>
                </div>
            </div>
        )
    }
};

export default FileList;