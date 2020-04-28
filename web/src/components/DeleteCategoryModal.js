import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeCategoryAndItsFiles } from '../actions/documentation.actions';

const DeleteCategoryModal = ({ categoryId }) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    let style;
    if(showModal) {
        style = {display: 'block', paddingRight: '16px'}
    }

    return (
        <>
        <div className="text-danger" onClick={()=>{setShowModal(true)}} style={{cursor: 'pointer'}}>
            <i className="nav-icon i-Close-Window font-weight-bold" data-toggle="modal" data-target="#removeCategory"></i>
        </div>
        
        <div className={`modal fade bd-example-modal-sm ml-3 ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog"
             aria-labelledby="removeCategory" aria-hidden={`${!showModal}`} style={style}>
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-danger" id="removeCategory">
                            <i className="i-Danger"></i> Suppimer la catégorie
                        </h5>
                        <button className="close" type="button" data-dismiss="modal" 
                            aria-label="Close" onClick={()=>{setShowModal(false)}}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body text-danger">
                        Supprimer cette catégorie et tous les fichiers associés ?
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal"
                            onClick={()=>{setShowModal(false)}}>
                                Annuler
                        </button>
                        <button className="btn btn-danger ml-2" type="button"
                            onClick={()=> dispatch(removeCategoryAndItsFiles(categoryId))}>
                                Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
};

export default DeleteCategoryModal;