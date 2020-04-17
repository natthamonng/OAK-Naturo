import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDocuments } from '../../actions/documentation.actions';
import BreadCrumb from '../../components/Breadcrumb';
import SearchBar from '../../components/SearchBar';
import DocumentCardMenu from '../../components/DocumentCardMenu';
import RecentFileList from '../../components/RecentFileList';
import DocumentButtonMenu from '../../components/DocumentButtonMenu';
import CategoryList from '../../components/CategoryList';

const Documentation = (props) => {
    useEffect(() => {
        props.getDocuments();
    }, []);

    return (
        <div className="main-content">
            <div className="row">
                <div className="col-md-8">
                    <BreadCrumb sectionName={"Documentation"} pageName={"Tous les documents"}/>
                </div>
                <div className="col-md-4">
                    <SearchBar/>
                </div>
            </div>
            <div className="separator-breadcrumb border-top"></div>
            <section className="widget-app">
                <div className="row">
                    <div className="col-md-6 col-lg-4">
                        <DocumentCardMenu/>
                        <RecentFileList/>
                    </div>
                    <div className="col-md-6 col-lg-8">
                        <DocumentButtonMenu/>
                        <CategoryList/>
                    </div>
                </div>
            </section>
        </div>
    )
};

Documentation.propTypes = {
    loading: PropTypes.bool.isRequired,
    getDocuments: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    loading: state.documentation.loading
});

export default connect(mapStateToProps,{ getDocuments })(Documentation);