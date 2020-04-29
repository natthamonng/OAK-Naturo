import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategoryList } from '../../actions/documentation.actions';
import BreadCrumb from '../../components/Breadcrumb';
import Search from '../../components/Search';
import DocumentCardMenu from '../../components/DocumentCardMenu';
import DocumentButtonMenu from '../../components/DocumentButtonMenu';
import CategoryList from '../../components/CategoryList';
import Spinner from '../../components/Spinner';

const Documentation = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.documentation.loading);

    useEffect(() => {
        dispatch(getCategoryList());
    }, []);

    return (
        <div className="main-content">
            <div className="row">
                <div className="col-md-8">
                    <BreadCrumb mainName={"Documentation"} mainPath={"/documentation"} pageName={"Tous les documents"} />
                </div>
                <div className="col-md-4">
                    <Search/>
                </div>
            </div>
            <div className="separator-breadcrumb border-top"></div>
            <section className="widget-app">
                <div className="row">
                    <div className="col-md-6 col-lg-4">
                        <DocumentCardMenu/>
                    </div>
                    <div className="col-md-6 col-lg-8">
                        <DocumentButtonMenu/>
                        { loading ?
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