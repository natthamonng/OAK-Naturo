import React from 'react';

const AddCategoryForm = () => {
    return (
        <div className="card mb-4">
            <div className="card-header d-flex align-items-center">
                <h3 className="w-50 float-left card-title m-0">Ajouter une catégorie</h3>
                {/*<p>A form control layout using flex to create verticle alignment.</p>*/}
            </div>
            <div className="card-body">
                <div className="d-flex flex-column">
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="nom de catégorie"/>
                    </div>
                    <button className="btn btn-primary pd-x-20"><i className="i-File-Edit"></i> Ajouter</button>
                </div>
            </div>
        </div>
    )
};

export default AddCategoryForm;