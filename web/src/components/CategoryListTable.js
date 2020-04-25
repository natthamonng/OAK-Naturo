import React from 'react';
import { useSelector } from 'react-redux';

const CategoryListTable = () => {
    const categories = useSelector(state => state.documentation.categoryList);
    const categoryList = categories.map((category, index) => {
        return (
            <tr key={`${category.id}-${index}`}>
                <th scope="row">{index +1}</th>
                <td>{ category.categoryName }</td>
                <td><span className="badge badge-outline-primary">Activé</span></td>
                <td>
                    <a className="text-primary mr-2" href="#">
                        <i className="nav-icon i-Pen-2 font-weight-bold"></i>
                    </a>
                    <a className="text-danger mr-2" href="#">
                        <i className="nav-icon i-Close-Window font-weight-bold"></i>
                    </a>
                </td>
            </tr>
        )
    });

    return (
        <div className="card mb-4">
            <div className="card-header d-flex align-items-center">
                <h3 className="w-50 float-left card-title m-0">Liste des catégories</h3>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table dataTable-collapse text-center" id="category_table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nom de catégorie</th>
                            <th scope="col">Status(WIP)</th>
                            <th scope="col">Action(WIP)</th>
                        </tr>
                        </thead>
                        <tbody>

                        { categoryList }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default CategoryListTable;