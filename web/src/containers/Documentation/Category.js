import React from 'react';
import BreadCrumb from '../../components/Breadcrumb';

const Category = () => {
    return (
        <div className="main-content">
            <div className="row">
                <div className="col">
                    <BreadCrumb sectionName={"Documentation"} pageName={"Catégorie"} pageDetail={"Category name"}/>
                </div>
            </div>
            <div className="separator-breadcrumb border-top"></div>
            <section className="widget-app">
                <div className="row">
                    <div className="col-md-6 col-lg-3">

                    </div>
                    <div className="col-md-6 col-lg-9">

                    </div>
                </div>
            </section>
        </div>
    )
};

export default Category;