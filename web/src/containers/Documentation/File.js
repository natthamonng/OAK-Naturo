import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFile } from '../../actions/documentation.actions';
import BreadCrumb from '../../components/Breadcrumb';
import Spinner from '../../components/Spinner';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

const File = () => {
    const { categoryId, fileId } = useParams();
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.documentation.loading);
    const fileList = useSelector(state => state.documentation.categoryList.find(element => element.id == categoryId));

    useEffect(() => {
        dispatch(getFile(categoryId, fileId));
    }, [categoryId, fileId]);

    let file;
    let pageName;
    let body;
    if (fileList && isLoading === false){
        file = fileList.files.find(element => element.id == fileId);
        pageName = file.title;
        body = file.content;
    }

    return (
        <div className="main-content">
            <div className="row">
                <div className="col">
                    <BreadCrumb mainName={"Documentation"} mainPath={"/documentation"} sectionName={"Fichiers"}
                                sectionPath={`/documentation/categories/${categoryId}`} pageName={pageName} />
                </div>
            </div>
            <div className="separator-breadcrumb border-top"></div>
            <section className="widget-app">
                <div className="row">
                    <div className="col-md-6 col-lg-10 offset-lg-1">
                        {isLoading ?
                            <div className="d-flex justify-content-center mt-5">
                                <Spinner/>
                            </div>
                            :
                            <div>
                                <ReactQuill
                                    value={body}
                                    readOnly={true}
                                    theme={"bubble"}
                                />
                                {/*<div dangerouslySetInnerHTML={{ __html: body }} />*/}
                            </div>
                        }
                    </div>
                </div>
            </section>
        </div>
    )
};

export default File;