import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editProfile } from '../../actions/profile.actions';
import Alert from '../../components/Alert';
import avatar from '../../assets/images/faces/user.png';

const ProfileSettings = ({ editProfile, user }) => {
    const [editUsernameMode, setEditUsernameMode] = useState(false);
    const [editEmailMode, setEditEmailMode] = useState(false);

    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);

    const handleOnUsernameChange = e => {
        setUsername(e.target.value)
    };

    const handleOnEmailChange = e => {
        setEmail(e.target.value)
    };

    const handleOnUsernameSubmit = () => {
        if(username.length === 0) return;
        editProfile({id: user.id, username})
    };

    const handleOnEmailSubmit = () => {
        if(username.length === 0) return;
        editProfile({id: user.id, email})
    };

    return (
        <div className="main-content">
            <div className="breadcrumb">
                <h1>Paramètres du compte</h1>
                <ul>
                    <li>Paramètre</li>
                    <li>Paramètres du compte</li>
                </ul>
            </div>
            <div className="separator-breadcrumb border-top"></div>
            <Alert/>
            <div className="col-md-6 offset-md-3">
                <div className="card user-profile o-hidden mb-4">
                    <div className="header-cover"></div>
                    <div className="user-info">
                        <img className="profile-picture avatar-lg mb-2" src={avatar} alt="user-avater"/>
                        <p className="m-0 text-24">{user.username}</p>
                    </div>
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <div>
                                    <span className="text-small text-muted">Username</span>
                                    {editUsernameMode?
                                        <form className="mt-2"
                                              onSubmit={handleOnUsernameSubmit}>
                                            <div className="form-group mb-3">
                                                <input
                                                    className="form-control form-control-rounded"
                                                    type="text"
                                                    value={username}
                                                    onChange={(e => handleOnUsernameChange(e))}
                                                />
                                            </div>
                                            <div className="d-flex">
                                                <div className="flex-grow-1"></div>
                                                <button className="btn btn-secondary btn-rounded mr-1"
                                                        onClick={()=>setEditUsernameMode(false)}>Annuler</button>
                                                <button className="btn btn-primary btn-rounded">Modifier</button>
                                            </div>
                                        </form>
                                    :
                                        <h5>{ user.username }</h5>
                                    }
                                </div>
                                <small className={`text-primary ${editUsernameMode? 'd-none': ''}`}
                                       onClick={()=>setEditUsernameMode(true)}>
                                    <ins>Modifier</ins>
                                </small>
                            </li>
                            <li className="list-group-item">
                                <div>
                                    <span className="text-small text-muted">Adresse mail</span>
                                    {editEmailMode?
                                        <form className="mt-2"
                                              onSubmit={handleOnEmailSubmit}>
                                            <div className="form-group mb-3">
                                                <input
                                                    className="form-control form-control-rounded"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e => handleOnEmailChange(e))}
                                                />
                                            </div>
                                            <div className="d-flex">
                                                <div className="flex-grow-1"></div>
                                                <button className="btn btn-secondary btn-rounded mr-1"
                                                        onClick={()=>setEditEmailMode(false)}>Annuler</button>
                                                <button className="btn btn-primary btn-rounded">Modifier</button>
                                            </div>
                                        </form>
                                        :
                                        <h5>{ user.email }</h5>
                                    }

                                </div>
                                <small className={`text-primary ${editEmailMode? 'd-none': ''}`}
                                       onClick={()=>setEditEmailMode(true)}>
                                    <ins>Modifier</ins>
                                </small>
                            </li>
                            {/*<li className="list-group-item">*/}
                            {/*    <span className="text-small text-muted">Mot de passe</span>*/}
                            {/*    <h5>********</h5>*/}
                            {/*    <small className="text-primary"><ins>Modifier</ins></small>*/}
                            {/*</li>*/}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

ProfileSettings.propTypes = {
    editProfile: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, { editProfile })(ProfileSettings);