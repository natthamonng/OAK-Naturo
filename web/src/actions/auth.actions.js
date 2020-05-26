import axios from 'axios';
import { setAlert } from './alert.actions';
import { authService } from '../services/auth.service';
import * as actionsType  from '../constants/ActionTypes';
import setAuthToken from '../utils/setAuthToken';
import {socketService} from '../services/socket.service';

const BASE_URL = process.env.REACT_APP_API_URL;
const defaultErrorMessage = 'Une erreur s\'est produite. Veuillez réessayer plus tard.';

// Check token & load user by JWT
export const loadUserByJwt = (token) => async dispatch => {
    dispatch({ type: actionsType.USER_LOADING });
    setAuthToken(token);
    await axios.get(`${BASE_URL}/api/auth/me`)
        .then(res =>{
            if (res.data.success === true) {
                dispatch({
                    type: actionsType.USER_LOADED,
                    payload: res.data
                });
                setAuthToken(res.data.token);
                authService.setToken(res.data.token);
                socketService.createSocketConnection();
            }
        })
        .catch(err => {
            if(!err.response) {
                dispatch(setAlert(defaultErrorMessage, 'danger', 50000))
            } else {
                dispatch(setAlert(err.response.data.message, 'danger'));
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
        if (res.data.success === true) {
            setAuthToken(res.data.token);
            authService.setToken(res.data.token);
            dispatch({
                type: actionsType.SIGNIN_SUCCESS,
                payload: res.data
            });
            socketService.createSocketConnection();
        }
    } catch (err) {
        if(!err.response) {
            dispatch(setAlert(defaultErrorMessage, 'danger', 50000))
        } else {
            dispatch(setAlert(err.response.data.message, 'danger'));
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
    socketService.disconnectSocket();
};

// SignUp
export  const signUpUser = (signUpData) => async dispatch => {
    try {
        const res = await axios.post(`${BASE_URL}/api/auth/signup`, signUpData);
        if (res.data.success === true) {
            dispatch({
                type: actionsType.SIGNUP_SUCCESS,
                payload: res.data
            });
        }
    } catch (err) {
        if(!err.response) {
            dispatch(setAlert(defaultErrorMessage, 'danger', 50000))
        } else {
            dispatch(setAlert(err.response.data.message, 'danger'));
        }

        dispatch({
            type: actionsType.SIGNUP_FAILED
        });
    }
};
