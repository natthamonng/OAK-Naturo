import React, { useEffect, useState } from 'react';
// import { createSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getCategoryList, getFile} from '../../actions/documentation.actions';
import Moment from 'react-moment';
import BreadCrumb from '../../components/Breadcrumb';
import EditFileForm from '../../components/EditFileForm';
import Spinner from '../../components/Spinner';
import _404 from '../../components/_404';
import Alert from '../../components/Alert';
// import ReactQuill from 'react-quill';
import '../../assets/scss/quill-editor.scss';


// const selectCategory = createSelector(
//     state => state.documentation.categoryList,
//     categoryList => categoryList.filter(category => category)
// );

const File = () => {
    const { categoryId, fileId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const error = useSelector(state => state.documentation.error);
    // const categoryList = useSelector(selectCategory);
    const categoryList = useSelector(state => state.documentation.categoryList);
    if (categoryList.length <= 1) {
        dispatch(getCategoryList())
    }

    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        dispatch(getFile(categoryId, fileId));
    }, [categoryId, fileId]);

    let file, categoryTarget;
    if (categoryList.length !== 0) {
        categoryTarget = categoryList.find(element => element.id === Number(categoryId));
        file = categoryTarget.files.find(element => element.id === Number(fileId));
    }

    if (file && !error) {
        return (
            <div className="main-content">
                <div className="row">
                    <div className="col">
                        <BreadCrumb mainName={"Documentation"} mainPath={"/documentation"} sectionName={"Fichiers"}
                                    sectionPath={`/documentation/categories/${categoryId}`} pageName={categoryTarget.categoryName} />
                    </div>
                </div>
                <div className="separator-breadcrumb border-top"></div>
                <section className="widget-app">
                    <div className="row">
                        <div className="col-md-6 col-lg-10 offset-lg-1">
                            { isEditMode ?
                                <>
                                <EditFileForm
                                    file={file}
                                    categoryList={categoryList }
                                    setIsEditMode={setIsEditMode}
                                />
                                <Alert />
                                </>

                                :

                                <div>
                                    <h1 className="mb-4">{file.title}</h1>
                                    {/*<ReactQuill*/}
                                    {/*    value={file.content}*/}
                                    {/*    readOnly={true}*/}
                                    {/*    theme={"bubble"}*/}
                                    {/*/>*/}
                                    <div className="content-body" dangerouslySetInnerHTML={{ __html: file.content }} />
                                    <div className="separator-breadcrumb border-top"></div>
                                    <div className="d-flex align-items-start">
                                        <div className="ml-2">
                                            <p className="m-0 text-title text-16 flex-grow-1">Auteur: { file.author.username }</p>
                                            <p className="text-muted text-small">Modifié: {' '}
                                                <Moment format="DD/MM/YYYY">{ file.updatedAt }</Moment>
                                            </p>
                                        </div>
                                        <div className="flex-grow-1"></div>
                                        { ( file.content && ( user.role === 'admin' || file.user_id === user.id)) &&
                                            <button className="btn btn-outline-primary m-1"
                                                onClick={()=> setIsEditMode(true)}>
                                                <i className="i-Pen-3" ></i> Modifier le fichier
                                            </button>
                                        }
                                    </div>
                                </div>
                            }
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

export default File;