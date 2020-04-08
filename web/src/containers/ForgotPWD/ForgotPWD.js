import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import { setAlert } from '../../actions/alert.actions';
import Alert from '../../components/Alert';
import Spinner  from '../../components/Spinner';


import PhotoWide from '../../assets/images/photo-wide-6.jpg';
import Logo from '../../assets/images/acorn.png'

const BASE_URL = 'http://localhost:8080';

const ForgotPWD = ({ setAlert, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    const { email } =  formData;

    const onChange = event => {
        setFormData({...formData, [event.target.id]: event.target.value});
    };

    const onSubmit = async event => {
        event.preventDefault();
        forgotPassword({ email });
    };

    const forgotPassword = ({ email }) => {
        setIsLoading(true);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({ email });

        axios.post(`${BASE_URL}/api/auth/forgot-password`, body, config)
            .then(res => {
                setIsLoading(false);
                const success = res.data.success;
                success.forEach(msg => setAlert(msg.message, 'primary'));
            })
            .catch(err => {
                setIsLoading(false);
                const errors = err.response.data.errors;
                if (errors) {
                    errors.forEach(error => setAlert(error.message, 'danger'));
                }
            })
    }

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
                                        <Spinner />
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
}

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
