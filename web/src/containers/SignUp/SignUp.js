import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert.actions';
import { signUpUser } from '../../actions/auth.actions';

import Alert from '../../components/Alert';
import logo from '../../assets/images/acorn.png';
import photoWide from '../../assets/images/photo-wide-9.jpg';
import photoLong from '../../assets/images/photo-wide-8.jpg';

const SignUp = ({ setAlert, signUpUser, isAuthenticated  }) => {
    const [formData, setFormData] = useState({
        username:'',
        email: '',
        password: '',
        password2: ''
    });

    const { username, email, password, password2 } = formData;

    const onChange = event => {
        setFormData({...formData, [event.target.id]: event.target.value });
    }

    const onSubmit = async event => {
        event.preventDefault();
        if (password !== password2) {
            setAlert('Le mot de passe ne correspond pas.', 'danger');
        } else {
            signUpUser({ username, email, password });
        }
    };

    if (isAuthenticated) {
        // If signed in and user navigates to Signup page, should redirect them to home
        return <Redirect to='/home' />
    }

   return (
       <div className="auth-layout-wrap" style={{backgroundImage: 'url('+ photoWide +')'}}>
           <div className="auth-content">
               <Alert/>
               <div className="card o-hidden">
                   <div className="row">
                       <div className="col-md-6 text-center"
                            style={{backgroundSize: 'cover', backgroundImage: 'url(' + photoLong + ')'}}>
                           <div className="pl-3 auth-right">
                               <div className="auth-logo text-center mt-2 mt-md-4 mb-4">
                                   <img src={logo} alt="logo"/>
                               </div>
                               <div className="flex-grow-1"></div>
                               <div className="w-100 mb-4">
                                   <Link to="/signin" className="btn btn-outline-primary btn-block btn-icon-text btn-rounded">
                                       <i className="i-Mail-with-At-Sign"></i> Sign in with Email
                                   </Link>
                                   <a className="btn btn-outline-google btn-block btn-icon-text btn-rounded">
                                       <i className="i-Google-Plus"></i> Sign in with Google
                                   </a>
                                   <a className="btn btn-outline-facebook btn-block btn-icon-text btn-rounded">
                                       <i className="i-Facebook-2"></i> Sign in with Facebook
                                   </a>
                               </div>
                               <div className="flex-grow-1"></div>
                           </div>
                       </div>
                       <div className="col-md-6">
                           <div className="p-4">
                               <h1 className="mb-3 text-18">Sign Up</h1>
                               <form onSubmit={event => onSubmit(event)}>
                                   <div className="form-group">
                                       <label htmlFor="username">Your name</label>
                                       <input
                                           className="form-control form-control-rounded"
                                           id="username"
                                           type="text"
                                           value={username}
                                           onChange={event => onChange(event)}
                                           autoComplete="username"
                                           required
                                       />
                                   </div>
                                   <div className="form-group">
                                       <label htmlFor="email">Email address</label>
                                       <input
                                           className="form-control form-control-rounded"
                                           id="email"
                                           type="email"
                                           value={email}
                                           onChange={event => onChange(event)}
                                           autoComplete="email"
                                           required
                                       />
                                   </div>
                                   <div className="form-group">
                                       <label htmlFor="password">Password</label>
                                       <input
                                           className="form-control form-control-rounded"
                                           id="password"
                                           type="password"
                                           value={password}
                                           onChange={event => onChange(event)}
                                           autoComplete="new-password"
                                           minlength="8" required
                                       />
                                   </div>
                                   <div className="form-group">
                                       <label htmlFor="repassword">Retype password</label>
                                       <input
                                           className="form-control form-control-rounded"
                                           id="password2"
                                           type="password"
                                           value={password2}
                                           onChange={event => onChange(event)}
                                           autoComplete="new-password"
                                           minlength="8" required
                                       />
                                   </div>
                                   <button className="btn btn-primary btn-block btn-rounded mt-3" type="submit">Sign Up</button>
                               </form>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   )
}

SignUp.propTypes = {
    setAlert: PropTypes.func.isRequired,
    signUpUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { setAlert, signUpUser }
)(SignUp);
