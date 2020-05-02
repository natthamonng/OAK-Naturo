import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert.actions';
import Alert from '../../components/Alert';
import SpinnerBubble from '../../components/SpinnerBubble';
import logo from '../../assets/images/acorn.png';
import photoWide from '../../assets/images/photo-wide-6.jpg';

const BASE_URL = process.env.REACT_APP_API_URL;

const ResetPWD = ({ setAlert , match}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [updated, setUpdated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const { params: { token }} = match;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                resetPWDToken: token
            }
        };

        axios.get(`${BASE_URL}/api/auth/reset-password`, config)
            .then( res => {
                setUsername(res.data.username);
                setUpdated(false);
                setIsLoading(false);
                setError(false);
            })
            .catch(err => {
                const error = err.response.data.message;
                if (error) {
                    console.error(error);
                }
                setUpdated(false);
                setIsLoading(false);
                setError(true);
            })
    }, []);

    const handleOnPasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleOnRepeatedPasswordChange = event => {
        setRepeatedPassword(event.target.value);
    };

    const onSubmit = event => {
        event.preventDefault();
        if (password !== repeatedPassword) {
            setAlert('Le mot de passe ne correspond pas.', 'danger');
        } else {
            updatePassword({ username, password });
        }
    };

    const updatePassword = ({ username, password }) => {
        const {params: {token}} = match;
        const body = {username, password, resetPWDToken: token};

        axios.put(`${BASE_URL}/api/auth/update-password`, body)
            .then(res => {
                if (res.data.success === true) {
                    setUpdated(true);
                    setError(false);
                }
            })
            .catch(err => {
                const error = err.response.data.message;
                if (error) {
                    setAlert(error, 'danger');
                }
                setUpdated(false);
                setError(true);
            })
    };

   return (
       <div className="auth-layout-wrap" style={{backgroundImage: 'url(' + photoWide +')'}}>
           <div className="auth-content">

                <Alert />

               <div className="card o-hidden">
                   <div className="row">
                       <div className="col-12">
                           <div className="p-4">

                           { isLoading ?
                               <SpinnerBubble/>
                               :
                               <div className="auth-logo text-center mb-4"><img src={logo} alt="logo"/></div>
                           }

                           { error ?
                               <div className="text-center">
                                   <h1 className="mb-3 text-18">
                                       Votre lien de réinitialisation du mot de passe n'est pas valide ou a expiré.
                                   </h1>
                                   <button className="btn btn-raised btn-raised-secondary m-1" type="button">
                                       <Link to='/forgot-password'>Mot de passe oublié</Link>
                                   </button>
                                   <button className="btn btn-raised btn-raised-secondary m-1" type="button">
                                       <Link to='/signin'>Se connecter</Link>
                                   </button>
                               </div>
                               :
                               <div>

                                   { updated ?
                                       <div className="text-center">
                                       <h1 className="mb-3 text-18">
                                           Votre mot de passe a été réinitialisé avec succès, veuillez vous connecter
                                       </h1>
                                       <button className="btn btn-raised btn-raised-secondary m-1" type="button">

                                           <Link to='/signin'>Se connecter</Link>
                                       </button>
                                       </div>
                                       :
                                       <>
                                       <h1 className="mb-3 text-18">Réinitialiser le mot de passe</h1>
                                       <form onSubmit={event => onSubmit(event)}>
                                           <div className="form-group">
                                               <label htmlFor="password">Mot de passe</label>
                                               <input
                                                   className="form-control form-control-rounded"
                                                   id="password"
                                                   type="password"
                                                   value={password}
                                                   onChange={event => handleOnPasswordChange(event)}
                                                   autoComplete="new-password"
                                                   minLength="8" required
                                               />
                                           </div>
                                           <div className="form-group">
                                               <label htmlFor="repassword">Comfirmer mot de passe</label>
                                               <input
                                                   className="form-control form-control-rounded"
                                                   id="password2"
                                                   type="password"
                                                   value={repeatedPassword}
                                                   onChange={event => handleOnRepeatedPasswordChange(event)}
                                                   autoComplete="new-password"
                                                   minLength="8" required
                                               />
                                           </div>
                                           <button className="btn btn-primary btn-block btn-rounded mt-3"
                                                   type="submit">Réinitialiser
                                           </button>
                                       </form>
                                       </>
                                   }
                               </div>
                           }
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   )
}

ResetPWD.propTypes = {
    setAlert: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired,
        }),
    }),
};

export default connect(
    null,
    { setAlert }
)(ResetPWD);
