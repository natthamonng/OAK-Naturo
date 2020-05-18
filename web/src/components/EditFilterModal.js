import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editFilterPost } from '../actions/post.actions';
import { Modal } from 'react-bootstrap';

const EditFilterModal = ({ post }) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState(post.filter);

    const handleOnFilterChange = event => {
        setFilter(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(editFilterPost(post.id, filter));
    };

    return (
        <>
            <i className="i-Pen-3" type="button" data-toggle="modal" data-target="#changeFilter"
               onClick={()=>{setShowModal(true)}} style={{cursor: 'pointer'}}></i>

            <Modal show={showModal} onHide={()=> setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Changer le filtre</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={event => onSubmit(event)}>
                        <fieldset className="form-group">
                            <div className="row">
                                <div className="col-form-label col-sm-2 pt-0">Filtres</div>
                                <div className="col-sm-10">
                                    <div className="form-check">
                                        <input className="form-check-input"
                                               id={`general-${post.id}`} type="radio"
                                               name="filters" value="general"
                                               onChange={handleOnFilterChange}
                                               checked={filter === 'general'} />
                                        <label className="form-check-label ml-3" htmlFor={`general-${post.id}`}>
                                            Général
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input"
                                               id={`witness-${post.id}`} type="radio"
                                               name="filters" value="witness"
                                               onChange={handleOnFilterChange}
                                               checked={filter === 'witness'} />
                                        <label className="form-check-label ml-3" htmlFor={`witness-${post.id}`}>
                                            Témoignage
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input"
                                               id={`protocol-${post.id}`} type="radio"
                                               name="filters" value="protocol"
                                               onChange={handleOnFilterChange}
                                               checked={filter === 'protocol'} />
                                        <label className="form-check-label ml-3" htmlFor={`protocol-${post.id}`}>
                                            Protocole
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input"
                                               id={`protocol-${post.id}`} type="radio"
                                               name="filters" value="pro"
                                               onChange={handleOnFilterChange}
                                               checked={filter === 'pro'} />
                                        <label className="form-check-label ml-3" htmlFor={`pro-${post.id}`}>
                                            Pro
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-dismiss="modal" type="button"
                                    onClick={()=> setShowModal(false)}>
                                Annuler
                            </button>
                            <button className="btn btn-primary" type="submit"
                                    onClick={()=> setShowModal(false)}>
                                Valider
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
};

export default EditFilterModal;