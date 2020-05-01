import axios from 'axios';
import { setAlert } from './alert.actions';
import { authService } from '../services/auth.service';
import {USER_LOADING, USER_LOADED, AUTH_ERROR, SIGNUP_SUCCESS, SIGNUP_FAILED, SIGNIN_SUCCESS, SIGNIN_FAILED, SIGNOUT} from '../constants/ActionTypes';
import setAuthToken from "../utils/setAuthToken";

const BASE_URL = process.env.REACT_APP_API_URL;

// Check token & load user by JWT
export const loadUserByJwt = (token) => async dispatch => {
    dispatch({ type: USER_LOADING });
    setAuthToken(token);
    await axios.get(`${BASE_URL}/api/auth/me`)
        .then(res =>{
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
            setAuthToken(res.data.token);
            authService.setToken(res.data.token);
        })
        .catch(err => {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
            }
            dispatch({
                type: AUTH_ERROR
            });
        });
};

// SignIn
export const signInUser = (signInData) =>  async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify(signInData);
    try {
        const res = await axios.post(`${BASE_URL}/api/auth/signin`, body, config);
        setAuthToken(res.data.token);
        authService.setToken(res.data.token);
        dispatch({
            type: SIGNIN_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
        }
        dispatch({
            type: SIGNIN_FAILED
        });
    }
};

// Sign user out
export const signOutUser = () => dispatch => {
    setAuthToken(null);
    authService.logout();
    dispatch({ type: SIGNOUT });
};

// SignUp
export  const signUpUser = ({ username, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({username, email, password });
    try {
        const res = await axios.post(`${BASE_URL}/api/auth/signup`, body, config);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
        }
        dispatch({
            type: SIGNUP_FAILED
        });
    }
};
