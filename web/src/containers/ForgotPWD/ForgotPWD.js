import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { setAlert } from '../../actions/alert.actions';
import Alert from '../../components/Alert';
import SpinnerBubble  from '../../components/SpinnerBubble';
import PhotoWide from '../../assets/images/photo-wide-6.jpg';
import Logo from '../../assets/images/acorn.png'

const BASE_URL = process.env.REACT_APP_API_URL;

const ForgotPWD = ({ setAlert, isAuthenticated}) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onChange = event => {
        setEmail(event.target.value)
    };

    const onSubmit = async event => {
        event.preventDefault();
        forgotPassword({email});
    };

    const forgotPassword = (email) => {
        setIsLoading(true);
        axios.post(`${BASE_URL}/api/auth/forgot-password`, email)
            .then(res => {
                setIsLoading(false);
                setEmail('');
                setAlert(res.data.success, 'primary');
            })
            .catch(err => {
                setIsLoading(false);
                setAlert(err.response.data.error, 'danger');
            })
    };

    if (isAuthenticated) {
        // If signed in and user navigates to ForgotPWD page, should redirect them to home
        return <Redirect to='/home'/>
    }

    return (
        <div className="auth-layout-wrap" style={{backgroundImage: 'url(' + PhotoWide + ')'}}>
            <div className="auth-content">
                <Alert/>
                <div className="card o-hidden">
                    <div className="row">
                        <div className="col-12">
                            <div className="p-4">
                                <div className="auth-logo text-center mb-4">
                                    { isLoading ?
                                        <SpinnerBubble />
                                        :
                                        <img src={Logo} alt="Logo"/>
                                    }
                                </div>
                                <h1 className="mb-3 text-18">
                                    Mot de passe oublié
                                </h1>
                                <form onSubmit={event => onSubmit(event)}>
                                    <div className="form-group">
                                        <label htmlFor="email">Adresse mail</label>
                                        <input
                                            className="form-control form-control-rounded"
                                            id="email"
                                            type="email"
                                            onChange={event => onChange(event)}
                                            value={email}
                                            autoComplete="email"
                                            required
                                        />
                                    </div>
                                    <button className="btn btn-primary btn-block btn-rounded mt-3">
                                        submit
                                    </button>
                                </form>
                                <div className="mt-3 text-center">
                                    <Link to={'/signin'} className="text-muted">
                                        <u>Se connecter</u>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

ForgotPWD.propTypes = {
    setAlert: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { setAlert }
)(ForgotPWD);
