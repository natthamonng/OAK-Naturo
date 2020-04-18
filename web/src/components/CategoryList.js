import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CategoryList = () => {
    const role = useSelector(state => state.auth.user.role);
    const categories = useSelector(state => state.documentation.documentation);

    const categoryList = categories.map(category => {
        return (
            <div key={ category.id } className="col-lg-6 col-md-12 mb-4">
                <div className="p-4 border border-light rounded d-flex align-items-center">
                    <i className="i-Folder text-32 mr-3"></i>
                    <div>
                        <h4 className="text-18 mb-1">{category.categoryName}</h4>
                        <span>Total: {category.files.length} fichier(s)</span>
                    </div>
                </div>
            </div>
        )
    });

    return (
        <div className="card mb-4">
            <div className="card-body">
                <div className="card-title m-0">Catégories</div>
                <div className="row mt-3">

                    { categoryList }

                </div>

                { role === "admin" &&
                <Link to="/documentation/add-category" className="text-small text-muted font-italic float-right">
                    <i className="i-Folder-Add-"></i> Ajouter une catégorie
                </Link>
                }

            </div>
        </div>
    )
};

export default CategoryList;