import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFile } from '../../actions/documentation.actions';
import Moment from 'react-moment';
import BreadCrumb from '../../components/Breadcrumb';
import Search from '../../components/Search';
import EditFileForm from '../../components/EditFileForm';
import SpinnerBubble from '../../components/SpinnerBubble';
import _404 from '../../components/_404';
import Alert from '../../components/Alert';
import PrintButton from '../../components/PrintButton';

const File = () => {
    const { categoryId, fileId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const notFound = useSelector(state => state.documentation.notFound);
    const categoryList = useSelector(state => state.documentation.categoryList);
    const fileLoading = useSelector(state => state.documentation.loading);
    const editingFile = useSelector(state => state.documentation.actionFileLoading);

    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        dispatch(getFile(categoryId, fileId));
    }, [categoryId, fileId]);

    let file, categoryTarget;
    if (categoryList.length !== 0 && !fileLoading) {
        categoryTarget = categoryList.find(element => element.id === Number(categoryId));
        file = categoryTarget.files.find(element => element.id === Number(fileId));
    }

    if (notFound) {
        return <_404/>
    }

    if (file && !notFound && !fileLoading) {
        return (
            <div className="main-content">
                <div className="row">
                    <div className="col-md-8">
                        <BreadCrumb mainName={"Documentation"} mainPath={"/documentation"}
                                    sectionName={"Fichiers"} sectionPath={`/documentation/categories/${categoryId}`}
                                    pageName={categoryTarget.categoryName} />
                    </div>
                    <div className="col-md-4">
                        <Search/>
                    </div>
                </div>
                <div className="separator-breadcrumb border-top"></div>
                <section className="widget-app">
                    <div className="row">
                        <div className="col-12 col-lg-10 offset-lg-1">
                            { isEditMode ?
                                <>
                                <div className="card mb-3">
                                    <EditFileForm
                                        file={file}
                                        categories={categoryList}
                                        loading={editingFile}
                                    />

                                    <button className="btn btn-secondary m-4 mt-0 border-0"
                                            type="button" onClick={()=> setIsEditMode(false)}>
                                         <ins>Annuler</ins>
                                    </button>
                                </div>

                                    <Alert />
                                </>

                                :

                                <div>
                                    <div className="d-flex align-items-start">
                                        <h1 className="mb-4">{file.title}</h1>
                                        <div className="flex-grow-1"></div>
                                    </div>
                                    
                                    <div className="content-body" dangerouslySetInnerHTML={{ __html: file.content }} />

                                    <div className="separator-breadcrumb border-top"></div>
                                    <div className="d-flex align-items-start">
                                        <div className="ml-2">
                                            <p className="m-0 text-title text-16"><strong>Auteur:</strong> {' '}
                                                { file.author.username }
                                            </p>
                                            <div>
                                                <span className="text-muted text-small"><strong>Créé:</strong> {' '}
                                                    <Moment format="DD/MM/YYYY">{ file.createdAt }</Moment>
                                                </span>
                                                {' '}
                                                <span className="text-muted text-small"><strong>Modifié:</strong> {' '}
                                                    <Moment format="DD/MM/YYYY">{ file.updatedAt }</Moment>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1"></div>
                                        <div className="d-flex flex-column">
                                        { ( file.content && ( user.role === 'admin' || file.user_id === user.id)) &&
                                            <button className="btn btn-outline-primary m-1"
                                                    onClick={()=> setIsEditMode(true)}>
                                                <i className="i-Pen-3" ></i> Modifier le fichier
                                            </button>
                                        }
                                        <PrintButton file={file}/>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </section>
            </div>
        )
    } else {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: "50vh"}}>
                <SpinnerBubble/>
            </div>
        )
    }

};

export default File;