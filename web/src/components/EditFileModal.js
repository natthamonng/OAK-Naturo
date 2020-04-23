import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QuillSnowEditor from './editor/QuillSnowEditor';
import { editFile } from '../actions/documentation.actions';
import ReactQuill from "react-quill";

const EditFileModal = ({file}) => {
    const [title, setTitle] = useState(file.title);
    //TODO content undefined sometime
    const [content, setContent] = useState(file.content);
    // const [categoryId, setCategoryId] = useState(file.category_id);
    const [showModal, setShowModal] = useState(false);
    let style;
    if(showModal) {
        style = {display: 'block', paddingRight: '16px'}
    }

    const onTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const onEditorChange = (value) => {
        setContent(value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(title)
        console.log(content)
    };

    return (
        <>
            <button className="btn btn-outline-primary m-1"  data-toggle="modal" data-target="#editFile"
                    data-weather="@getbootstrap" style={{cursor: 'pointer'}}
                    onClick={()=>{setShowModal(true)}}>
                 <i className="i-Pen-3" ></i> Modifier le fichier
            </button>

            <div className={`modal fade bd-example-modal-lg ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog"
                 aria-labelledby="editFile" aria-hidden={`${!showModal}`} style={style}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editFile">
                                Modifier le fichier (WIP)
                            </h5>
                            <button onClick={()=>{setShowModal(false)}} className="close" type="button"
                                    data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={event => onSubmit(event)}>
                                <div className="form-group">
                                    <div className="form-group mb-3">
                                        <label htmlFor="title">Titre</label>
                                        <input className="form-control" id="title" type="text" placeholder="titre..."
                                               onChange={event => onTitleChange(event)} value={title} required />
                                    </div>
                                </div>

                                <div className="form-group edit-file-modal">
                                    <ReactQuill
                                        value={content}
                                        theme={"snow"}
                                        onEditorChange={onEditorChange}
                                    />
                                </div>

                                <div className="modal-footer  pr-0">
                                    <button className="btn btn-secondary" type="button" data-dismiss="modal"
                                            onClick={()=>{setShowModal(false)}}>
                                        Annuler
                                    </button>
                                    <button className="btn btn-primary ml-2" type="submit"
                                            onClick={()=>{setShowModal(false)}}>
                                        Save changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

};

export default EditFileModal;