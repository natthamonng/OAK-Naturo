import React, {useState} from 'react';
import { Modal } from 'react-bootstrap';

const EditUserProfileModal = ({ userProfile, editUserProfile }) => {
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState(userProfile.username);
    const [email, setEmail] = useState(userProfile.email);
    const [role, setRole] = useState(userProfile.role);

    const handleOnUsernameChange = event => {
        setUsername(event.target.value);
    };

    const handleOnEmailChange = event => {
        setEmail(event.target.value);
    };

    const handleOnRoleChange = event => {
        setRole(event.target.value);
    };

    const handleOnCancelClick = () => {
        setUsername(userProfile.username);
        setEmail(userProfile.email);
        setRole(userProfile.role);
        setShowModal(false);
    };

    //TODO WIP
    const onSubmit = (event) => {
        event.preventDefault();
        editUserProfile({username, email, role}, userProfile.id)
    };

    return (
        <>
            <i className="i-Pen-3" type="button" data-toggle="modal" data-target="#editCategoryName"
               onClick={()=>{setShowModal(true)}} style={{cursor: 'pointer'}}></i>

            <Modal show={showModal} onHide={()=> setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier le profile d'utilisateur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={event => onSubmit(event)}>
                        <div className="card-body">
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label className="ul-form__label" htmlFor="username">
                                        Username:
                                    </label>
                                    <div className="input-group mb-3">
                                        <input className="form-control form-control-rounded"
                                               type="text"
                                               aria-label="username" aria-describedby="username"
                                               value={username}
                                               onFocus={e => e.currentTarget.select()}
                                               onChange={event => handleOnUsernameChange(event)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group col-md-12">
                                    <label className="ul-form__label" htmlFor="email">
                                        Adresse mail:
                                    </label>
                                    <div className="input-group mb-3">
                                        <input className="form-control form-control-rounded"
                                               type="email"
                                               aria-label="email" aria-describedby="email"
                                               value={email}
                                               onChange={event => handleOnEmailChange(event)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group col-md-12">
                                    <label className="ul-form__label" htmlFor="role">
                                        Rôle
                                    </label>
                                    <select onChange={event => handleOnRoleChange(event)}
                                        id="role" className="form-control form-control-rounded"
                                        value={role}>
                                        <option value="visitor">Visiteur</option>
                                        <option value="partner">Partenaire</option>
                                        <option value="admin">Administrateur</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-dismiss="modal" type="button"
                                    onClick={handleOnCancelClick}>Annuler</button>
                            <button className="btn btn-primary"  type="submit"
                                    onClick={()=>{setShowModal(false)}}>Modifier</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
};

export default EditUserProfileModal;