import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

export default function SearchResultItem({file}) {
    return (
        <div className="card d-flex mb-2">
            <div className="card-body">
                <Link to={`/documentation/categories/${file.category_id}/files/${file.id}`} className="w-100">
                    <h5 className="item-title">{file.title}</h5>
                </Link>
                <div className="d-flex">
                    <div className="d-flex flex-column">
                        <small className="m-0 text-muted text-small">
                            <span className="font-weight-bold">Auteur: </span>{file.author.username}
                        </small>
                        <div>
                            <small className="m-0 text-muted text-small">
                                <span className="font-weight-bold">Créé:</span> {' '}
                                <Moment format="DD/MM/YYYY">{file.createdAt}</Moment>
                            </small>
                            {' '}
                            <small className="m-0 text-muted text-small">
                                <span className="font-weight-bold">Modifié:</span> {' '}
                                <Moment format="DD/MM/YYYY">{file.updatedAt}</Moment>
                            </small>
                        </div>
                    </div>
                    <div className="flex-grow-1"></div>
                    <p className="m-0 text-muted text-small item-badges">
                        <span className="badge badge-primary">{file.category.categoryName}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}