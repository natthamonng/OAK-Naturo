import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert.actions';

import Alert from '../../components/Alert';
import Spinner from '../../components/Spinner';

import logo from '../../assets/images/acorn.png';
import photoWide from '../../assets/images/photo-wide-6.jpg';

const BASE_URL = 'http://localhost:8080';

const ResetPWD = ({ setAlert , match}) => {
    const [state, setState] = useState({
        username: '',
        password: '',
        password2: '',
        updated: false,
        isLoading: true,
        error: false
    });

    useEffect(() => {
        const { params: { token }} = match;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                resetPWDToken: token
            }
        }

        axios.get(`${process.env.REACT_APP_API_URL}/api/auth/reset-password`, config)
            .then( res => {
                setState((previousState) => {
                    return {
                        ...previousState,
                        username: res.data.username,
                        updated: false,
                        isLoading: false,
                        error: false
                    }
                });
                console.log(res.data.success);
            })
            .catch(err => {
                const errors = err.response.data.errors;
                if (errors) {
                console.error(errors);
                }
                setState((previousState) => {
                    return {
                    ...previousState,
                    updates: false,
                    isLoading: false,
                    error: true
                    }
                })
            })
    }, []);

    const { password, password2 } = state;

    const onChange = event => {
        setState({...state, [event.target.id]: event.target.value });
    }

    const onSubmit = event => {
        event.preventDefault();
        if (password !== password2) {
            setAlert('Le mot de passe ne correspond pas.', 'danger');
        } else {
            const { username, password } = state;
            updatePassword({ username, password });
        }
    };

    const updatePassword = ({ username, password }) => {
        const {params: {token}} = match;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({username, password, resetPWDToken: token});

        axios.put(`${BASE_URL}/api/auth/update-password`, body, config)
            .then(res => {
                setState((previousState) => {
                    return {
                        ...previousState,
                        updated: true,
                        error: false
                    }
                });
                const success = res.data.success;
                success.forEach(msg => setAlert(msg.message, 'primary'));
            })
            .catch(err => {
                const errors = err.response.data.errors;
                if (errors) {
                    errors.forEach(error => setAlert(error.message, 'danger'));
                }
                setState((previousState) => {
                    return {
                        ...previousState,
                        updated: false,
                        error: true
                    }
                });
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

                           { state.isLoading ?
                               <Spinner/>
                               :
                               <div className="auth-logo text-center mb-4"><img src={logo} alt="logo"/></div>
                           }

                           { state.error ?
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

                                   {state.updated ?
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
                                                   onChange={event => onChange(event)}
                                                   autoComplete="new-password"
                                                   minlength="8" required
                                               />
                                           </div>
                                           <div className="form-group">
                                               <label htmlFor="repassword">Comfirmer mot de passe</label>
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
