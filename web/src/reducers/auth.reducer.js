import  * as actionsType from '../constants/ActionTypes';
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
        case actionsType.USER_LOADING:
        case actionsType.EDIT_PROFILE_BEGIN:
            return {
                ...state,
                loading: true
            };
        case actionsType.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload.user,
                token: payload.token
            };
        case actionsType.EDIT_PROFILE_SUCCESS:
            return {
                ...state,
                user: payload.data.user,
                token: payload.data.token,
                loading: false
            };
        case actionsType.SIGNIN_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionsType.SIGNIN_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
                user: payload.user
            };
        case actionsType.SIGNUP_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: false,
                loading: false
            };
        case actionsType.EDIT_PROFILE_FAILURE:
            return {
                ...state,
                loading: false
            };
        case actionsType.AUTH_ERROR:
        case actionsType.SIGNUP_FAILED:
        case actionsType.SIGNIN_FAILED:
        case actionsType.SIGNOUT:
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