import React from 'react';
import BreadCrumb from '../../components/Breadcrumb';
import AddCategoryForm from '../../components/AddCategoryForm';
import CategoryListTable from "../../components/CategoryListTable";

const AddCategory = () => {
    return (
        <div className="main-content">
            <div className="row">
                <div className="col">
                    <BreadCrumb sectionName={"Documentation"} pageName={"Ajouter une catégorie"}/>
                </div>
            </div>
            <div className="separator-breadcrumb border-top"></div>
            <section className="widget-app">
                <div className="row">
                    <div className="col-md-4">
                        <AddCategoryForm/>
                    </div>
                    <div className="col-md-8">
                        <CategoryListTable/>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default AddCategory;