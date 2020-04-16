import React from 'react';
import BreadCrumb from '../../components/Breadcrumb';
import SearchBar from '../../components/SearchBar';
import DocumentCardMenu from '../../components/DocumentCardMenu';
import RecentFileList from '../../components/RecentFileList';
import DocumentButtonMenu from '../../components/DocumentButtonMenu';
import CategoryList from '../../components/CategoryList';

const Documentation = () => {
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

export default Documentation;