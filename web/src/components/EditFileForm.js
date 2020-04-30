import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editFile, getCategoryList } from '../actions/documentation.actions';
import QuillSnowEditor from './editor/QuillSnowEditor';
import 'react-quill/dist/quill.bubble.css';

const EditFileForm = ({ file, categories, loading }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const fileId = file.id;

    const [ categoryId, setCategoryId ] = useState(file.category_id);
    const [ title, setTitle ] = useState(file.title);
    const [ content, setContent ] = useState(file.content);
    const [ files, setFiles ] = useState([]);

    useEffect(() => {
        if (categoryList.length <= 1) {
            dispatch(getCategoryList())
        }
    }, []);

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
            fileId: fileId,
            title: title,
            content: content,
            categoryId: Number(categoryId)
        };

        dispatch(editFile(body));

        setTimeout(() => {
            history.push(`/documentation/categories/${categoryId}/files/${fileId}`);
        }, 2000)
    };

    const categoryList = categories.map(category => {
        return <option key={category.id} value={category.id}>{category.categoryName}</option>
    });

    return (
        <form className="card-body" onSubmit={(event => onSubmit(event))}>
            <div className="d-flex flex-column">
                <div className="form-group">
                    <div className="form-group mb-3">
                        <label htmlFor="title">Titre</label>
                        <input className="form-control" id="title" type="text"
                               onChange={event => onTitleChange(event)} value={title} required />
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-group mb-3">
                        <label htmlFor="picker1">Catégorie</label>
                        <select className="form-control" defaultValue={categoryId} required
                                onChange={event => onCategoryChange(event)}>
                            { categoryList }
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <QuillSnowEditor
                        defaultValue={content}
                        onEditorChange={onEditorChange}
                        onFilesChange={onFilesChange}
                        required
                    />
                </div>
                <div className="d-flex">
                    <div className="flex-grow-1"></div>
                    { loading ?
                        <div className="spinner spinner-primary m-2"></div>
                        :
                        <button className="btn  btn-block btn-primary mx-1" type="submit">
                            Modifier
                        </button>
                    }
                </div>
            </div>
        </form>
    )
};

export default EditFileForm;