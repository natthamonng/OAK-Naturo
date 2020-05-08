import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { setAlert } from '../../actions/alert.actions';
import Alert from '../../components/Alert';
import SpinnerBubble  from '../../components/SpinnerBubble';
import PhotoWide from '../../assets/images/photo-wide-6.jpg';
import Logo from '../../assets/images/acorn.png'
import { Helmet } from 'react-helmet';

const BASE_URL = process.env.REACT_APP_API_URL;

const ForgotPWD = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleOnEmailChange = event => {
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
                dispatch(setAlert(res.data.message, 'primary'));
            })
            .catch(err => {
                setIsLoading(false);
                dispatch(setAlert(err.response.data.message, 'danger'));
            })
    };

    if (isAuthenticated) {
        // If signed in and user navigates to ForgotPWD page, should redirect them to home
        return <Redirect to='/home'/>
    }

    return (
        <div className="auth-layout-wrap" style={{backgroundImage: 'url(' + PhotoWide + ')'}}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Oak - Mot de passe oublié</title>
            </Helmet>
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
                                            onChange={handleOnEmailChange}
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

export default ForgotPWD;
