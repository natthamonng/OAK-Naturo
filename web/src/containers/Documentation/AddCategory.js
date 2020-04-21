import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getCategoryList } from '../../actions/documentation.actions';
import BreadCrumb from '../../components/Breadcrumb';
import AddCategoryForm from '../../components/AddCategoryForm';
import CategoryListTable from '../../components/CategoryListTable';
import Alert from '../../components/Alert';

const AddCategory = () => {
    const categoryList = useSelector(state => state.documentation.categoryList);
    const dispatch = useDispatch();
    if (categoryList.length === 0) {
        dispatch(getCategoryList())
    }

    return (
        <div className="main-content">
            <div className="row">
                <div className="col">
                    <BreadCrumb mainName={"Documentation"} mainPath={"/documentation"}  pageName={"Ajouter une catégorie"} />
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