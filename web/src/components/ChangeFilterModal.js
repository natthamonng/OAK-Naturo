import React, {useState} from 'react';
import { connect } from 'react-redux';
import { changeFilterPost } from '../actions/post.actions';
import {addNewComment} from "../actions/comment.actions";

const ChangeFilterModal = ({post, changeFilterPost }) => {
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState(post.filter);

    let style;
    if(showModal) {
        style = {display: 'block', paddingRight: '16px'}
    }

    const onChange = event => {
        setFilter(event.target.value);
    };


    const onSubmit = (event) => {
        event.preventDefault();
        changeFilterPost(post.id, filter)
    };

    return (
        <>
        <i className="i-Pen-3" type="button" data-toggle="modal" data-target="#changeFilter" data-weather="@getbootstrap"
           onClick={()=>{setShowModal(true)}} style={{cursor: 'pointer'}}></i>

        <div className={`modal fade ${showModal ? 'show' : ''}`} id="changeFilter" tabIndex="-1" role="dialog"
             aria-labelledby="changeFilter" aria-hidden={`${!showModal}`} style={style}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="verifyModalContent2_title">Changer le filtre</h5>
                        <button onClick={()=>{setShowModal(false)}} className="close" type="button"
                                data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={event => onSubmit(event)}>
                            <fieldset className="form-group">
                                <div className="row">
                                    <div className="col-form-label col-sm-2 pt-0">Filtres</div>
                                    <div className="col-sm-10">
                                        <div className="form-check">
                                            <input className="form-check-input"
                                                   id={`general-${post.id}`} type="radio"
                                                   name="filters" value="general"
                                                   onChange={event => onChange(event)}
                                                   checked={filter === 'general'} />
                                            <label className="form-check-label ml-3" htmlFor={`general-${post.id}`}>
                                                Général
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input"
                                                   id={`witness-${post.id}`} type="radio"
                                                   name="filters" value="witness"
                                                   onChange={event => onChange(event)}
                                                   checked={filter === 'witness'} />
                                            <label className="form-check-label ml-3" htmlFor={`witness-${post.id}`}>
                                                Témoignage
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input"
                                                   id={`protocol-${post.id}`} type="radio"
                                                   name="filters" value="protocol"
                                                   onChange={event => onChange(event)}
                                                   checked={filter === 'protocol'} />
                                            <label className="form-check-label ml-3" htmlFor={`protocol-${post.id}`}>
                                                Protocole
                                            </label>
                                        </div>
                                        {/*<div className="form-check">*/}
                                        {/*    <input className="form-check-input"*/}
                                        {/*           id={`pro-${post.id}`} type="radio"*/}
                                        {/*           name="filters" value="pro"*/}
                                        {/*           onChange={event => onChange(event)}*/}
                                        {/*           checked={filter === 'pro'} />*/}
                                        {/*    <label className="form-check-label ml-3" htmlFor={`pro-${post.id}`}>*/}
                                        {/*        Pro*/}
                                        {/*    </label>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </fieldset>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" data-dismiss="modal" type="button"
                                        onClick={()=>{setShowModal(false)}}>Annuler</button>
                                <button className="btn btn-primary"  type="submit"
                                        onClick={()=>{setShowModal(false)}}>Valider</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
};

export default connect( null, { changeFilterPost })(ChangeFilterModal);