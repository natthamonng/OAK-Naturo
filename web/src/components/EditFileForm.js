import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { editFile } from '../actions/documentation.actions';
import QuillSnowEditor from './editor/QuillSnowEditor';
import 'react-quill/dist/quill.bubble.css';

const EditFileForm = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const fileId = props.file.id;
    const editFileLoading = useSelector(state => state.documentation.editFileLoading);
    const [ categoryId, setCategoryId ] = useState(props.file.category_id);
    const [ title, setTitle ] = useState(props.file.title);
    const [ content, setContent ] = useState(props.file.content);
    const [ files, setFiles ] = useState([]);

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

    const categoryList = props.categoryList.map(category => {
        return <option key={category.id} value={category.id}>{category.categoryName}</option>
    });

    return (
        <div className="card mb-3">
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
                        { editFileLoading ?
                            <div className="spinner spinner-primary m-2"></div>
                            :
                            <button className="btn  btn-block btn-primary" type="submit">
                                Modifier
                            </button>
                        }
                    </div>
                </div>
            </form>
        </div>
    )
};

export default EditFileForm;