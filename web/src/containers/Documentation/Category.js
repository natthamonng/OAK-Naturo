import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {getCategoryFileList} from '../../actions/documentation.actions';
import BreadCrumb from '../../components/Breadcrumb';
import FileList from '../../components/FileList';
import Spinner from '../../components/Spinner';
import _404 from "../../components/_404";

const Category = () => {
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const error = useSelector(state => state.documentation.error);
    const categoryList = useSelector(state => state.documentation.categoryList);

    useEffect(() => {
        dispatch(getCategoryFileList(categoryId));
    }, [categoryId]);

    let fileList;
    if( categoryList.length !== 0) {
        fileList = categoryList.find(element => element.id === Number(categoryId))
    }

    if (fileList && !error) {
        return (
            <div className="main-content">
                <div className="row">
                    <div className="col">
                        <BreadCrumb mainName={"Documentation"} mainPath={"/documentation"} sectionName={"Catégories"}
                                    sectionPath={"/documentation"} pageName={fileList.categoryName} />
                    </div>
                </div>
                <div className="separator-breadcrumb border-top"></div>
                <section className="widget-app">
                    <div className="row">
                        <div className="col">
                            <div className="card mb-4">
                                <FileList files={fileList.files}/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    } else if (error) {
        return <_404/>
    } else {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner/>
            </div>
        )
    }

};

export default Category;