import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

export default function SearchResultItem({ file }) {
    return (
        <Link to={`/documentation/categories/${file.category_id}/files/${file.id}`}
              className="ul-widget-app__row-comments border-bottom-gray-200 mb-0">
            <div className="ul-widget-app__comment w-100">
                <div className="ul-widget-app__profile-title">
                    <h6 className="heading">{file.title}</h6>
                </div>
                <div className="ul-widget-app__profile-status">
                    <div className="d-flex flex-column">
                        <small className="text-mute">
                            <span className="font-weight-bold">Auteur: </span>
                            { file.author.username }
                        </small>
                        <small className="text-mute">
                            <span className="font-weight-bold">Modifié: </span>
                            <Moment fromNow>{ file.updatedAt }</Moment>
                        </small>
                    </div>
                    <div className="flex-grox-1"></div>
                    <div className="badge badge-light text-white m-2">
                        {file.category.categoryName}
                    </div>
                </div>
            </div>
        </Link>
    )
}