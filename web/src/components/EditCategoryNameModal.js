import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { editCategoryName } from '../actions/documentation.actions';
import { Modal } from 'react-bootstrap';

const EditCategoryNameModal = ({ category }) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [categoryName, setCategoryName] = useState(category.categoryName);

    const onChange = event => {
        setCategoryName(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(editCategoryName(category.id, {categoryName}));
    };

    return (
        <>
            <i className="i-Pen-3" type="button" data-toggle="modal" data-target="#editCategoryName"
               onClick={()=>{setShowModal(true)}} style={{cursor: 'pointer'}}></i>

            <Modal show={showModal} onHide={()=> setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier le nom d'une catégorie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={event => onSubmit(event)}>
                        <div className="card-body">
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label className="ul-form__label" htmlFor="category-name">
                                        Catégorie:
                                    </label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                                    <span className="input-group-text" id="category-name">
                                                        <i className="i-Information"></i>
                                                    </span>
                                        </div>
                                        <input className="form-control"
                                               type="text"
                                               aria-label="category-name" aria-describedby="category-name"
                                               value={categoryName}
                                               onFocus={e => e.currentTarget.select()}
                                               onChange={(event) => onChange(event)}
                                        />
                                    </div>
                                    {/*<small className="ul-form__text form-text" id="passwordHelpBlock">*/}
                                    {/*    Some help content goes here*/}
                                    {/*</small>*/}
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-dismiss="modal" type="button"
                                    onClick={()=>{setShowModal(false)}}>Annuler</button>
                            <button className="btn btn-primary"  type="submit"
                                    onClick={()=>{setShowModal(false)}}>Modifier</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
};

export default EditCategoryNameModal;