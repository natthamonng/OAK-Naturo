import axios from 'axios';
import { setAlert } from './alert.actions';
import { authService } from '../services/auth.service';
import * as actionsType  from '../constants/ActionTypes';
import setAuthToken from '../utils/setAuthToken';

const BASE_URL = process.env.REACT_APP_API_URL;
const defaultErrorMessage = 'Une erreur s\'est produite. Veuillez réessayer plus tard.';

// Check token & load user by JWT
export const loadUserByJwt = (token) => async dispatch => {
    dispatch({ type: actionsType.USER_LOADING });
    setAuthToken(token);
    await axios.get(`${BASE_URL}/api/auth/me`)
        .then(res =>{
            dispatch({
                type: actionsType.USER_LOADED,
                payload: res.data
            });
            setAuthToken(res.data.token);
            authService.setToken(res.data.token);
        })
        .catch(err => {
            if(!err.response) {
                dispatch(setAlert(defaultErrorMessage, 'danger', 50000))
            } else {
                dispatch(setAlert(err.response.data.error, 'danger'));
            }

            dispatch({
                type: actionsType.AUTH_ERROR
            });
        });
};

// SignIn
export const signInUser = (signInData) =>  async dispatch => {
    dispatch({
        type: actionsType.SIGNIN_REQUEST
    });
    try {
        const res = await axios.post(`${BASE_URL}/api/auth/signin`, signInData);
        setAuthToken(res.data.token);
        authService.setToken(res.data.token);
        dispatch({
            type: actionsType.SIGNIN_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        if(!err.response) {
            dispatch(setAlert(defaultErrorMessage, 'danger', 50000))
        } else {
            dispatch(setAlert(err.response.data.error, 'danger'));
        }

        dispatch({
            type: actionsType.SIGNIN_FAILED
        });
    }
};

// Sign user out
export const signOutUser = () => dispatch => {
    setAuthToken(null);
    authService.logout();
    dispatch({ type: actionsType.SIGNOUT });
};

// SignUp
export  const signUpUser = (signUpData) => async dispatch => {
    try {
        const res = await axios.post(`${BASE_URL}/api/auth/signup`, signUpData, config);
        dispatch({
            type: actionsType.SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        if(!err.response) {
            dispatch(setAlert(defaultErrorMessage, 'danger', 50000))
        } else {
            dispatch(setAlert(err.response.data.error, 'danger'));
        }

        dispatch({
            type: actionsType.SIGNUP_FAILED
        });
    }
};
