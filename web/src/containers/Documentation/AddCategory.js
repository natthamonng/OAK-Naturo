import React, {useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getCategoryList } from '../../actions/documentation.actions';
import BreadCrumb from '../../components/Breadcrumb';
import AddCategoryForm from '../../components/AddCategoryForm';
import CategoryListTable from '../../components/CategoryListTable';
import Alert from '../../components/Alert';

const AddCategory = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategoryList());
    }, []);

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
                        <Alert/>
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