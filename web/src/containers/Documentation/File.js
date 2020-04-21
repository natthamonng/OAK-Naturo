import React, { useEffect } from 'react';
import { createSelector } from 'reselect';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFile } from '../../actions/documentation.actions';
import BreadCrumb from '../../components/Breadcrumb';
import Spinner from '../../components/Spinner';
import Moment from 'react-moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

// const selectCategory = createSelector(
//     state => state.documentation.categoryList,
//     categoryList => categoryList.filter(category => category)
// );

const File = () => {
    const { categoryId, fileId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.documentation.loading);
    const error = useSelector(state => state.documentation.error);
    // const category = useSelector(selectCategory);
    const category = useSelector(state => state.documentation.categoryList.find(element => element.id == categoryId));

    useEffect(() => {
        dispatch(getFile(categoryId, fileId));
    }, [categoryId, fileId]);

    let {file, categoryName, title, body, author, date} = {};
    if (category && isLoading === false){
        file = category.files.find(element => element.id == fileId);
        categoryName = category.categoryName;
        title = file.title;
        body = file.content;
        author = file.author.username;
        date = file.updatedAt;
    }

    // Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be
    // a pure function of props and state.
    // if (error) {
    //     history.push('/page-not-found');
    // }

    return (
        <div className="main-content">
            <div className="row">
                <div className="col">
                    <BreadCrumb mainName={"Documentation"} mainPath={"/documentation"} sectionName={"Fichiers"}
                                sectionPath={`/documentation/categories/${categoryId}`} pageName={categoryName} />
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
                                <h1>{title}</h1>
                                <ReactQuill
                                    value={body}
                                    readOnly={true}
                                    theme={"bubble"}
                                />
                                {/*<div dangerouslySetInnerHTML={{ __html: body }} />*/}
                                <div className="separator-breadcrumb border-top"></div>
                                <div className="d-flex align-items-start">
                                    <div className="ml-2">
                                        <p className="m-0 text-title text-16 flex-grow-1">Auteur: { author }</p>
                                        <p className="text-muted text-small">Modifié: <Moment format="DD/MM/YYYY">{ date }</Moment></p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </section>
        </div>
    )
};

export default File;