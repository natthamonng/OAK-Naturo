import axios from 'axios';
import { setAlert } from './alert.actions';
import  * as actionsType from '../constants/ActionTypes';
const BASE_URL = process.env.REACT_APP_API_URL;

export const getCategoryListBegin = () => {
    return {
        type: actionsType.GET_CATEGORY_LIST_BEGIN
    }
};

export const getCategoryListSuccess = categoryList => ({
    type: actionsType.GET_CATEGORY_LIST_SUCCESS,
    payload: { categoryList }
});

export const getCategoryListFailure = error => ({
    type: actionsType.GET_CATEGORY_LIST_FAILURE,
    payload: { error }
});

export const getCategoryFileListBegin = () => {
    return {
        type: actionsType.GET_CATEGORY_FILE_LIST_BEGIN
    }
};

export const getCategoryFileListSuccess = files => ({
    type: actionsType.GET_CATEGORY_FILE_LIST_SUCCESS,
    payload: { files }
});

export const getCategoryFileListFailure = error => ({
    type: actionsType.GET_CATEGORY_FILE_LIST_FAILURE,
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

export const getFileBegin = () => {
    return {
        type: actionsType.GET_FILE_BEGIN
    }
};

export const getFileSuccess = ( file ) => ({
    type: actionsType.GET_FILE_SUCCESS,
    payload: { file }
});

export const getFileFailure = error => ({
    type: actionsType.GET_FILE_FAILURE,
    payload: { error }
});

export const createFileBegin = () => {
    return {
        type: actionsType.CREATE_FILE_BEGIN
    }
};

export const createFileSuccess = ( file ) => ({
    type: actionsType.CREATE_FILE_SUCCESS,
    payload: { file }
});

export const createFileFailure = error => ({
    type: actionsType.CREATE_FILE_FAILURE,
    payload: { error }
});

export const editFileBegin = () => {
    return {
        type: actionsType.EDIT_FILE_BEGIN
    }
};

export const editFileSuccess = ( file ) => ({
    type: actionsType.EDIT_FILE_SUCCESS,
    payload: { file }
});

export const editFileFailure = error => ({
    type: actionsType.EDIT_FILE_FAILURE,
    payload: { error }
});

export const removeFileBegin = () => {
    return {
        type: actionsType.REMOVE_FILE_BEGIN
    }
};

export const removeFileSuccess = ( categoryId, fileId ) => ({
    type: actionsType.REMOVE_FILE_SUCCESS,
    payload: { categoryId, fileId }
});

export const removeFileFailure = error => ({
    type: actionsType.REMOVE_FILE_FAILURE,
    payload: { error }
});

export const getCategoryList = () => async dispatch => {
    dispatch(getCategoryListBegin());
    await axios.get(`${BASE_URL}/api/documentation/categories`)
        .then( res => {
            dispatch(getCategoryListSuccess(res.data))
        })
        .catch( err => {
            console.log(err.response.data.errors);
            dispatch(getCategoryListFailure(err.response.data.errors))
        })
};

export const getCategoryFileList = (categoryId) => async dispatch => {
    dispatch(getCategoryFileListBegin());
    await axios.get(`${BASE_URL}/api/documentation/categories/${categoryId}`)
        .then( res => {
            dispatch(getCategoryFileListSuccess(res.data))
        })
        .catch(err => {
            console.log(err.response.data.errors);
            dispatch(getCategoryFileListFailure(err.response.data.errors))
        })
};

export const getFile = (categoryId, fileId) => async dispatch => {
    dispatch(getFileBegin());
    await axios.get(`${BASE_URL}/api/documentation/categories/${categoryId}/files/${fileId}`)
        .then( res => {
            dispatch(getFileSuccess(res.data))
        })
        .catch(err => {
            const errors = err.response.data.errors;
            console.log(errors);
            dispatch(getFileFailure(errors))
        })
};

export const addNewCategory = (categoryName) => async dispatch => {
    dispatch(addCategoryBegin());
    await axios.post(`${BASE_URL}/api/documentation/categories`, categoryName)
        .then(res => {
            dispatch(addCategorySuccess(res.data));
            dispatch(setAlert(`Ajouté catégorie: ${res.data.categoryName}`, 'primary'))
        })
        .catch(err => {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
            }
            dispatch(addCategoryFailure(errors))
        })
};

export const createNewFile = (file) => async dispatch => {
    dispatch(createFileBegin());
    await axios.post(`${BASE_URL}/api/documentation/files`, file)
        .then(res => {
            dispatch(setAlert('Nouveau fichier créé avec succès.', 'primary'));
            dispatch(createFileSuccess(res.data));
        })
        .catch(err => {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
            }
            dispatch(createFileFailure(err.response.data.errors))
        })
};

export const editFile = (file) => async dispatch => {
    dispatch(editFileBegin());
    await axios.put(`${BASE_URL}/api/documentation/categories/${file.categoryId}/files/${file.fileId}/edit`, file)
        .then(res => {
            if (res.data.success === true) {
                dispatch(setAlert('Fichier mis à jour.', 'primary'));
                dispatch(editFileSuccess(file));
            }
        })
        .catch(err => {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
            }
            dispatch(editFileFailure(err.response.data.errors))
        })
};

export const removeFile = (categoryId, fileId) => async dispatch => {
    dispatch(removeFileBegin());
    await axios.put(`${BASE_URL}/api/documentation/categories/${categoryId}/files/${fileId}/update-status`, {status: 'unpublished'})
        .then(res => {
            if (res.data.success === true) {
                dispatch(removeFileSuccess(categoryId, fileId));
            }
        })
        .catch(err => {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
            }
            dispatch(removeFileFailure(err.response.data.errors))
        })
};







