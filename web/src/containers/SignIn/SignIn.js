import React, { useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signInUser } from '../../actions/auth.actions';
import Alert from '../../components/Alert';
import logo from '../../assets/images/acorn.png';
import photoWide from '../../assets/images/photo-wide-6.jpg';
import SpinnerBubble from '../../components/SpinnerBubble';
import '../../assets/scss/custom/welcome-text.scss';

function SignIn({ signInUser, isAuthenticated, loading }) {
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/home" } };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleOnEmailChange = event => {
        setEmail(event.target.value)
    };

    const handleOnPasswordChange = event => {
        setPassword(event.target.value)
    };

    const onSubmit = event => {
        event.preventDefault();
        signInUser({ email, password });
    };

    if (isAuthenticated) {
        // If signed in and user navigates to Signin page, should redirect them to home
        return <Redirect to={from.pathname} />
    }

    return (
        <div className="auth-layout-wrap" style={{backgroundImage: 'url(' + photoWide +')'}}>
            <div className="auth-content">
                <Alert/>
                <div className="card o-hidden">
                    <div className="row">
                        <div className="col-md-6 text-center"
                             style={{ backgroundSize: 'cover', backgroundColor: '#663399' }}>
                            <div className="pl-3 auth-right">
                                <div className="box-container m-2">
                                    <div className="box">
                                        <div className="title">
                                            <span className="block"></span>
                                            <h1>Oak Naturo<span></span></h1>
                                        </div>
                                        <div className="role">
                                            <div className="block"></div>
                                            <p>bienvenue</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="p-4">
                                <div className="auth-logo text-center mb-4">
                                { loading ?
                                    <SpinnerBubble/>
                                    :
                                    <img src={logo} alt="logo"/>
                                }
                                </div>
                                <h1 className="mb-3 text-18">Se connecter</h1>
                                <form onSubmit={event => onSubmit(event)}>
                                    <div className="form-group">
                                        <label htmlFor="email">Adresse mail</label>
                                        <input
                                            className="form-control form-control-rounded"
                                            id="email"
                                            type="email"
                                            onChange={event => handleOnEmailChange(event)}
                                            value={email}
                                            autoComplete="email"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Mot de passe</label>
                                        <input
                                            className="form-control form-control-rounded"
                                            id="password"
                                            type="password"
                                            onChange={event => handleOnPasswordChange(event)}
                                            value={password}
                                            minLength='4' required
                                            autoComplete="current-password"
                                        />
                                    </div>
                                    <button className="btn btn-rounded btn-primary btn-block mt-2" type="submit">
                                        Se connecter
                                    </button>
                                </form>
                                <div className="mt-3 text-center">
                                    <Link to="/forgot-password" className="text-muted">
                                        <u>Mot de passe oublié ?</u>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

SignIn.propTypes = {
    signInUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
});

export default connect(mapStateToProps, { signInUser })(SignIn);
