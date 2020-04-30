import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeCategoryAndItsFiles } from '../actions/documentation.actions';
import { Modal } from 'react-bootstrap';

const DeleteCategoryModal = ({ categoryId }) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="text-danger" onClick={()=>{setShowModal(true)}} style={{cursor: 'pointer'}}>
                <i className="nav-icon i-Close-Window font-weight-bold" data-toggle="modal" data-target="#removeCategory"></i>
            </div>

            <Modal show={showModal} onHide={()=> setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className="text-danger">
                            <i className="i-Danger"></i> Suppimer la catégorie
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-body text-danger">
                        Supprimer cette catégorie et tous les fichiers associés ?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" type="button" data-dismiss="modal"
                            onClick={()=>{setShowModal(false)}}>
                        Annuler
                    </button>
                    <button className="btn btn-danger ml-2" type="button"
                            onClick={()=> dispatch(removeCategoryAndItsFiles(categoryId))}>
                        Supprimer
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default DeleteCategoryModal;