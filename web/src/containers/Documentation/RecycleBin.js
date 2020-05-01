import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDeletedFiles, getDeletedCategories } from '../../actions/documentation.actions';
import BreadCrumb from '../../components/Breadcrumb';
import DeletedCategoryListTable from '../../components/DeletedCategoryListTable';
import DeletedFileListTable from '../../components/DeletedFileListTable';
import SpinnerBubble from '../../components/SpinnerBubble';

const RecycleBin = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.documentation.loading);
    const deletedFiles = useSelector(state => state.documentation.deletedFiles);
    const deletedCategories = useSelector(state => state.documentation.deletedCategories);

    useEffect(() => {
        dispatch(getDeletedFiles());
        dispatch(getDeletedCategories());
    }, []);

    return (
        <div className="main-content">
            <div className="row">
                <div className="col">
                    <BreadCrumb mainName={"Documentation"} mainPath={"/documentation"} pageName={"Corbeille"} />
                </div>
            </div>
            <div className="separator-breadcrumb border-top"></div>
            <section className="widget-app">
                <div className="row">
                    <div className="col-12 col-md-10 offset-md-1 mb-4">
                        { loading &&
                            <div className="col-12 d-flex justify-content-center align-items-center" style={{height: '50vh'}}>
                                <SpinnerBubble/>
                            </div>
                        }
                        { (!loading && deletedFiles.length === 0 && deletedCategories.length === 0) ?
                            <div className="d-flex align-items-center justify-content-center" style={{minHeight: '50vh'}}>
                                <h1 className="text-mute">
                                    <i className="i-Inbox-Empty"></i>{' '} Votre corbeille est vide.
                                </h1>
                            </div>
                            :
                            <>
                                <DeletedCategoryListTable deletedCategories={deletedCategories}/>
                                <DeletedFileListTable deletedFiles={deletedFiles}/>
                            </>
                        }
                    </div>
                </div>
            </section>
        </div>
    )
};

export default RecycleBin;