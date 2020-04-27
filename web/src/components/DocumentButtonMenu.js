import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const DocumentButtonMenu = () => {
    const role = useSelector(state => state.auth.user.role);

    return (
        <div className="row">
            <div className="col-12 col-sm-6">
                <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                    <NavLink to="/documentation/create-file" className="card-body text-center">
                        <i className="i-File-Edit"></i>
                        <div className="ml-4">
                            <p className="text-primary text-24 line-height-1 mb-2">Créer un fichier</p>
                        </div>
                    </NavLink>
                </div>
            </div>
            { role === "admin" &&
            <div className="col-12 col-sm-6">
                <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                    <NavLink to="/documentation/manage-category" className="card-body text-center">
                        <i className="i-Folder-Settings"></i>
                        <div className="ml-4">
                            <p className="text-primary text-24 line-height-1 mb-2">Gérer des catégories</p>
                            <p className="text-muted mt-2 mb-0">Ajouter, modifier ou supprimer des catégories</p>
                        </div>
                    </NavLink>
                </div>
            </div>
            }
        </div>
    )
};

export default DocumentButtonMenu;