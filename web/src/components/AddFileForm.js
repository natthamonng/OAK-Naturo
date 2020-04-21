import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import QuillEditor from './editor/QuillEditor';
import { createNewFile } from '../actions/documentation.actions';

const AddFileForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector(state => state.auth.user.id);
    const [ categoryId, setCategoryId ] = useState(1);
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    const [files, setFiles] = useState([]);

    const categories = useSelector(state => state.documentation.categoryList);
    const categoryList = categories.map(category => {
        return <option key={category.id} value={category.id}>{category.categoryName}</option>
    });

    const onCategoryChange = (event) => {
        setCategoryId(event.target.value);
    };

    const onTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const onEditorChange = (value) => {
        setContent(value);
    };

    const onFilesChange = (files) => {
        setFiles(files);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (title === '' || content === '') return;

        const body = {
            userId: userId,
            title: title,
            content: content,
            categoryId: Number(categoryId)
        };

        dispatch(createNewFile(body));

        setTimeout(() => {
            history.push(`/documentation/categories/${categoryId}`);
        }, 2000)
    };

    return (
        <div className="card">
            <form className="card-body" onSubmit={(event => onSubmit(event))}>
                <div className="d-flex flex-column">
                    <div className="form-group">
                        <div className="form-group mb-3">
                            <label htmlFor="title">Titre</label>
                            <input className="form-control" id="title" type="text" placeholder="titre..."
                                   onChange={event => onTitleChange(event)} value={title}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-group mb-3">
                            <label htmlFor="picker1">Catégorie</label>
                            <select className="form-control" onChange={event => onCategoryChange(event)}>
                                { categoryList}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <QuillEditor
                            placeholder={"Contenu..."}
                            onEditorChange={onEditorChange}
                            onFilesChange={onFilesChange}
                        />
                    </div>
                    <div>
                        <button className="btn btn-primary btn-block mb-3" type="submit">
                            Enregistrer
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default AddFileForm;