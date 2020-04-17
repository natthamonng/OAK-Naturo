import React from 'react';
const CategoryListTable = () => {
    return (
        <div className="card mb-4">
            <div className="card-header d-flex align-items-center">
                <h3 className="w-50 float-left card-title m-0">Listes des catégories</h3>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table dataTable-collapse text-center" id="category_table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nom de catégorie</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Head</td>
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
                        <tr>
                            <th scope="row">2</th>
                            <td>Hand</td>
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
                        <tr>
                            <th scope="row">3</th>
                            <td>Foot</td>
                            <td><span className="badge badge-light">Non activé</span></td>
                            <td>
                                <a className="text-primary mr-2" href="#">
                                    <i className="nav-icon i-Pen-2 font-weight-bold"></i>
                                </a>
                                <a className="text-danger mr-2" href="#">
                                    <i className="nav-icon i-Close-Window font-weight-bold"></i>
                                </a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default CategoryListTable;