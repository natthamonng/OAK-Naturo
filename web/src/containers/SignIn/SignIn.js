import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signInUser } from "../../actions/auth.actions";
import Alert from '../../components/Alert';
import logo from '../../assets/images/acorn.png';
import photoWide from '../../assets/images/photo-wide-6.jpg';

function SignIn({ signInUser, isAuthenticated }) {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } =  formData;

    const onChange = event => {
        setFormData({...formData, [event.target.id]: event.target.value});
    };

    const onSubmit = async event => {
        event.preventDefault();
        signInUser({email, password});
    };

    if (isAuthenticated) {
        // If signed in and user navigates to Signin page, should redirect them to home
        return <Redirect to='/home'/>
    }

    return (
        <div className="auth-layout-wrap" style={{backgroundImage: 'url(' + photoWide +')'}}>
            <div className="auth-content">
                <Alert/>
                <div className="card o-hidden">
                    <div className="row">
                        <div className="col-12">
                            <div className="p-4">
                                <div className="auth-logo text-center mb-4"><img src={logo} alt="logo"/></div>
                                <h1 className="mb-3 text-18">Se connecter</h1>
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
                                    <div className="form-group">
                                        <label htmlFor="password">Mot de passe</label>
                                        <input
                                            className="form-control form-control-rounded"
                                            id="password"
                                            type="password"
                                            onChange={event => onChange(event)}
                                            value={password}
                                            minLength='4' required
                                            autoComplete="current-password"
                                        />
                                    </div>
                                    <button className="btn btn-rounded btn-primary btn-block mt-2" type="submit">Se connecter</button>
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
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { signInUser }
)(SignIn);