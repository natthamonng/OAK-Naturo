import React from 'react';
import BreadCrumb from '../../components/Breadcrumb';
import CreateFileForm from '../../components/CreateFileForm';
import {useDispatch, useSelector} from 'react-redux';
import { getCategoryList } from '../../actions/documentation.actions';
import Alert from '../../components/Alert';

const CreateFile = () => {
    const categoryList = useSelector(state => state.documentation.categoryList);
    const dispatch = useDispatch();
    if (categoryList.length <= 1) {
        dispatch(getCategoryList())
    }

    return (
        <div className="main-content">
            <div className="row">
                <div className="col">
                    <BreadCrumb mainName={"Documentation"} mainPath={"/documentation"} pageName={"Créer un fichier"} />
                </div>
            </div>
            <div className="separator-breadcrumb border-top"></div>
            <section className="widget-app">
                <div className="row">
                    <div className="col-md-10 offset-md-1">
                        <CreateFileForm />
                        <div className="my-2"></div>
                        <Alert/>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default CreateFile;