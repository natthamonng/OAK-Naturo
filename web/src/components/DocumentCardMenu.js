import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import photoWide from '../assets/images/photo-wide-6.jpg'

const DocumentCardMenu = () => {
    const role = useSelector(state => state.auth.user.role);
    return (
        <div className="card mb-4 o-hidden">
            <img className="card-img-top" src={photoWide} alt="card-img-top"/>
            <div className="card-body">
                <h5 className="card-title">Documentation</h5>
                <p className="card-text">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero quis beatae officia saepe
                    perferendis voluptatum minima eveniet voluptates dolorum.
                </p>
            </div>
            <ul className="list-group list-group-flush">
                <Link to="/documentation/create-file" className="list-group-item">
                    <i className="i-File-Edit"></i> Créer un fichier
                </Link>
                { role === 'admin' &&
                <Link to="/documentation/add-category" className="list-group-item">
                    <i className="i-Folder-Add-"></i> Ajouter une catégorie
                </Link>
                }
                {role === 'admin' &&
                <Link to="/documentation/recycle-bin" className="list-group-item">
                    <i className="nav-icon mr-2 i-Empty-Box"></i>
                    <span className="item-name">Corbeille</span>
                </Link>
                }
            </ul>
        </div>
    )
};

export default DocumentCardMenu;