import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewCategory } from '../actions/documentation.actions';

const AddCategoryForm = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.documentation.addCategoryLoading);
    const [categoryName, setCategoryName] = useState('');

    const onChange = event => {
        setCategoryName(event.target.value);
    };

    const onSubmit = event => {
        event.preventDefault();
        dispatch(addNewCategory({categoryName}));
        setCategoryName('')
    };

    return (
        <div className="card mb-4">
            <div className="card-header d-flex align-items-center">
                <h3 className="w-50 float-left card-title m-0">Ajouter une catégorie</h3>
            </div>
            <form className="card-body" onSubmit={event => onSubmit(event)}>
                <div className="d-flex flex-column">
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="nom de catégorie"
                        onChange={ event => onChange(event)} value={categoryName}/>
                    </div>

                    { loading ?
                        <div className="spinner spinner-primary mr-3"></div>
                        :
                        <button className="btn btn-primary pd-x-20" type="submit">
                            <i className="i-File-Edit"></i> Ajouter
                        </button>
                    }
                </div>
            </form>
        </div>
    )
};

export default AddCategoryForm;
