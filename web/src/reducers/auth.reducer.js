import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    SIGNIN_SUCCESS,
    SIGNIN_FAILED,
    SIGNOUT,
    SIGNUP_SUCCESS,
    SIGNUP_FAILED,
    SIGNIN_REQUEST
} from '../constants/ActionTypes';
import { authService } from '../services/auth.service';

const initialState = {
    user: null,
    token: authService.getToken(),
    isAuthenticated: null,
    loading: false
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch ( type ) {
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload.user,
                token: payload.token
            };
        case SIGNIN_REQUEST:
            return {
                ...state,
                loading: true
            };
        case SIGNIN_SUCCESS:
            authService.setToken(payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
                user: payload.user
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: false,
                loading: false
            };
        case AUTH_ERROR:
        case SIGNUP_FAILED:
        case SIGNIN_FAILED:
        case SIGNOUT:
            authService.logout();
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false
            };
        default:
            return state;
    }
}