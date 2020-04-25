import React, { useEffect } from 'react';
import BreadCrumb from '../../components/Breadcrumb';
import DeletedFileListTable from '../../components/DeletedFileListTable';
import { useDispatch, useSelector } from 'react-redux';
import { getDeletedFiles } from '../../actions/documentation.actions';
import Spinner from '../../components/Spinner';

const RecycleBin = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.documentation.loading);

    useEffect(() => {
        dispatch(getDeletedFiles());
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
                    <div className="col-12 col-lg-10  offset-md-1 mb-4">
                        { loading ?
                            <div className="col-12 d-flex justify-content-center mt-4">
                                <Spinner/>
                            </div>
                        :
                            <DeletedFileListTable/>
                        }
                    </div>
                </div>
            </section>


        </div>
    )
};

export default RecycleBin;