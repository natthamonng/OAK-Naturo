import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const FileList = (props) => {
    let fileList;
    if(props.files) {
        fileList = props.files.map(file => {
            return (
                <Link to={`/documentation/categories/${file.category_id}/files/${file.id}`} key={file.id}
                      className="list-group-item list-group-item-action flex-column align-items-start" >
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{file.title}</h5>
                        <small>Modifié: <Moment format="DD/MM/YYYY">{file.updatedAt}</Moment></small>
                    </div>
                    <small>Auteur: {file.author.username}</small>
                </Link>
            )
        });
    }

    return (
        <div className="card text-left">
            <div className="card-body">
                <h4 className="card-title mb-4">Liste des fichiers: </h4>
                <div className="list-group">
                    { fileList }
                </div>
                <Link to="/documentation/create-file" className="text-small text-muted font-italic float-right mt-4">
                    <i className="i-File-Edit"></i> Créer un fichier
                </Link>
            </div>
        </div>
    )
};

export default FileList;