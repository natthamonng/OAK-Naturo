import axios from 'axios';
import { setAlert } from './alert.actions';
import { authService } from '../services/auth.service';
import * as actionsType  from '../constants/ActionTypes';
import setAuthToken from '../utils/setAuthToken';

const BASE_URL = process.env.REACT_APP_API_URL;
const defaultErrorMessage = 'Une erreur s\'est produite. Veuillez réessayer plus tard.';

export const editProfileBegin = () => {
    return {
        type: actionsType.EDIT_PROFILE_BEGIN
    }
};

export const editProfileSuccess = ( data ) => ({
    type: actionsType.EDIT_PROFILE_SUCCESS,
    payload: { data }
});

export const editProfileFailure = error => ({
    type: actionsType.EDIT_PROFILE_FAILURE,
    payload: { error }
});

export const editProfile = (data) => async dispatch => {
    dispatch(editProfileBegin());
    await axios.put(`${BASE_URL}/api/users/${data.id}`, data)
        .then(res => {
            if (res.data.success === true) {
                dispatch(editProfileSuccess(res.data))
            }
            setAuthToken(res.data.token);
            authService.setToken(res.data.token);
        })
        .catch(err => {
            if (err.response) {
                dispatch(editProfileFailure(err.response.data.message));
            } else {
                dispatch(editProfileFailure(defaultErrorMessage));
            }
        })
};