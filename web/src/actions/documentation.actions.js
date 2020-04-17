import axios from 'axios';
import { setAlert } from './alert.actions';
import  * as actionsType from '../constants/ActionTypes';

const BASE_URL = process.env.REACT_APP_API_URL;

export const setDocumentsLoading = () => {
    return {
        type: actionsType.DOCUMENTS_LOADING
    }
};

export const getDocumentsSuccess = categories => ({
    type: actionsType.GET_DOCUMENTS_SUCCESS,
    payload: { categories }
});

export const getDocumentsFailure = error => ({
    type: actionsType.GET_DOCUMENTS_FAILURE,
    payload: { error }
});

export const addCategoryBegin = () => {
    return {
        type: actionsType.ADD_CATEGORY_BEGIN
    }
};

export const addCategorySuccess = ( category ) => ({
    type: actionsType.ADD_CATEGORY_SUCCESS,
    payload: { category }
});

export const addCategoryFailure = error => ({
    type: actionsType.ADD_CATEGORY_FAILURE,
    payload: { error }
});

export const getDocuments = () => async dispatch => {
    dispatch(setDocumentsLoading());
    await axios.get(`${BASE_URL}/api/documentation`)
        .then( res => {
            dispatch(getDocumentsSuccess(res.data))
        })
        .catch(err => {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
            }
            dispatch(getDocumentsFailure(err.response.data.errors))
        })
};

export const addNewCategory = (categoryName) => async dispatch => {
    dispatch(addCategoryBegin());
    await axios.post(`${BASE_URL}/api/documentation/categories`, categoryName)
        .then(res => {
            dispatch(addCategorySuccess(res.data))
        })
        .catch(err => {
            console.log(err.response.data.errors);
            dispatch(addCategoryFailure(err.response.data.errors))
        })
};





