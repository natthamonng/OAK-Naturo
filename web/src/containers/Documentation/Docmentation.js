import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDocuments } from '../../actions/documentation.actions';
import BreadCrumb from '../../components/Breadcrumb';
import SearchBar from '../../components/SearchBar';
import DocumentCardMenu from '../../components/DocumentCardMenu';
import RecentFileList from '../../components/RecentFileList';
import DocumentButtonMenu from '../../components/DocumentButtonMenu';
import CategoryList from '../../components/CategoryList';
import Spinner from '../../components/Spinner';

const Documentation = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.documentation.loading);
    useEffect(() => {
        dispatch(getDocuments());
    }, []);

    return (
        <div className="main-content">
            <div className="row">
                <div className="col-md-8">
                    <BreadCrumb sectionName={"Documentation"} pageName={"Tous les documents"} url={'/documentation'}/>
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
                        { isLoading ?
                            <div className="col-12 d-flex justify-content-center mt-4">
                                <Spinner/>
                            </div>
                            :
                            <CategoryList/>
                        }
                    </div>
                </div>
            </section>
        </div>
    )
};

export default Documentation;