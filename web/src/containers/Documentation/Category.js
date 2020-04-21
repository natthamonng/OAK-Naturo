import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {getCategoryFileList} from '../../actions/documentation.actions';
import BreadCrumb from '../../components/Breadcrumb';
import FileList from '../../components/FileList';
import Spinner from '../../components/Spinner';

const Category = () => {
    const { categoryId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.documentation.loading);
    const error = useSelector(state => state.documentation.error);
    const fileList = useSelector(state => state.documentation.categoryList.find(element => element.id == categoryId));

    useEffect(() => {
        dispatch(getCategoryFileList(categoryId));
    }, [categoryId]);

    let pageName;
    let files;
    if(fileList && isLoading === false) {
        pageName = fileList.categoryName;
        files = fileList.files;
    }

    // Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be
    // a pure function of props and state.
    // if (error) {
    //     history.push('/page-not-found')
    // }

    return (
        <div className="main-content">
            <div className="row">
                <div className="col">
                    <BreadCrumb mainName={"Documentation"} mainPath={"/documentation"} sectionName={"Catégories"}
                                sectionPath={"/documentation"} pageName={pageName} />
                </div>
            </div>
            <div className="separator-breadcrumb border-top"></div>
            <section className="widget-app">
                <div className="row">
                    { isLoading ?
                        <div className="col-12 d-flex justify-content-center mt-4">
                            <Spinner/>
                        </div>
                        :
                        <div className="col">
                            <div className="card mb-4">
                                <FileList files={files}/>
                            </div>
                        </div>
                    }
                </div>
            </section>
        </div>
    )
};

export default Category;