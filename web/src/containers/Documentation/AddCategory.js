import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDocuments } from '../../actions/documentation.actions';
import BreadCrumb from '../../components/Breadcrumb';
import AddCategoryForm from '../../components/AddCategoryForm';
import CategoryListTable from '../../components/CategoryListTable';
import Alert from '../../components/Alert';

const AddCategory = (props) => {
    useEffect(() => {
        props.getDocuments();
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
                        <Alert/>
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

AddCategory.propTypes = {
    loading: PropTypes.bool.isRequired,
    getDocuments: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    loading: state.documentation.loading
});

export default connect(mapStateToProps,{ getDocuments })(AddCategory);