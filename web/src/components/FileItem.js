import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { removeFile } from '../actions/documentation.actions';

const FileItem = ({ file, role }) => {
    const dispatch = useDispatch();

    return (
        <div className="list-group-item list-group-item-action flex-column align-items-start">
            <Link to={`/documentation/categories/${file.category_id}/files/${file.id}`}
                  className="d-flex w-100 justify-content-between mb-2">
                <h5 className="mb-1">{file.title}</h5>
            </Link>
            <div className="d-flex flex-column flex-sm-row">
                <div className="flex-column">
                    <div>
                        <small className="text-small"><span className="font-weight-bold">Auteur:</span> {file.author.username}</small>
                    </div>
                    <div>
                        <small className="text-small"><span className="font-weight-bold">Créé:</span> &nbsp;
                            <Moment format="DD MMMM YYYY">{file.createdAt}</Moment>
                        </small>
                        &nbsp;
                        <small className="text-small"><span className="font-weight-bold">Modifié:</span> &nbsp;
                            <Moment format="DD MMMM YYYY">{file.updatedAt}</Moment>
                        </small>
                    </div>
                </div>
                <div className="flex-grow-1"></div>
                { role === "admin" &&
                <div className="d-flex align-items-end">
                    <small style={{cursor: "pointer"}} className="text-danger"
                           onClick={()=> dispatch(removeFile(file.category_id, file.id))}>
                        <i className="i-Close"></i> Supprimer
                    </small>
                </div>
                }
            </div>
        </div>
    )
};

export default FileItem;