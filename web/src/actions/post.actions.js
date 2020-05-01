import axios from 'axios';
import { setAlert } from './alert.actions';
import  * as actionsType from '../constants/ActionTypes';

const BASE_URL = process.env.REACT_APP_API_URL;

export const setPostsLoading = () => {
    return {
        type: actionsType.POSTS_LOADING
    }
};

export const getPostsSuccess = (posts, count) => ({
    type: actionsType.GET_POSTS_SUCCESS,
    payload: { posts, count }
});

export const setGetPostsPage = () => {
    return {
        type: actionsType.SET_GET_POST_PAGE
    }
};

export const getPostsFailure = error => ({
    type: actionsType.GET_POSTS_FAILURE,
    payload: { error }
});

export const addPostBegin = () => {
    return {
        type: actionsType.ADD_POST_BEGIN
    }
};

export const addPostSuccess = ( post ) => ({
    type: actionsType.ADD_POST_SUCCESS,
    payload: { post }
});

export const addPostFailure = error => ({
    type: actionsType.ADD_POST_FAILURE,
    payload: { error }
});

export const removePostBegin = () => {
    return {
        type: actionsType.REMOVE_POST_BEGIN
    }
};

export const removePostSuccess = ( postId ) => ({
    type: actionsType.REMOVE_POST_SUCCESS,
    payload: { postId }
});

export const removePostFailure = error => ({
    type: actionsType.REMOVE_POST_FAILURE,
    payload: { error }
});

export const editFilterPostBegin = () => {
    return {
        type: actionsType.EDIT_FILTER_POST_BEGIN
    }
};

export const editFilterPostSuccess = ( postId, filter ) => ({
    type: actionsType.EDIT_FILTER_POST_SUCCESS,
    payload: { postId, filter }
});

export const editFilterPostFailure = error => ({
    type: actionsType.EDIT_FILTER_POST_FAILURE,
    payload: { error }
});

export const getPosts = (filters, page) => async dispatch => {
    dispatch(setPostsLoading());
    await axios.get(`${BASE_URL}/api/posts/${filters}?page=${page}&pageSize=5`, filters)
        .then( res => {
            dispatch(getPostsSuccess(res.data.rows, res.data.count))
        })
        .catch(err => {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
            }
            dispatch(getPostsFailure(err.response.data.errors))
        })
};

export const addNewPost = (post) => async dispatch => {
    dispatch(addPostBegin());
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    await axios.post(`${BASE_URL}/api/posts`, post, config)
        .then(res => {
            dispatch(addPostSuccess(res.data))
        })
        .catch(err => {
            const errors = err.response.data.errors;
            errors.forEach(err => dispatch(setAlert(err.message, 'danger')));
            dispatch(addPostFailure(err.response.data.errors))
        })
};

export const removePost = (postId) => async dispatch => {
    dispatch(removePostBegin());
    await axios.put(`${BASE_URL}/api/posts/${postId}`)
        .then(res => {
            if (res.data.success === true) {
                dispatch(removePostSuccess(postId))
            }
        })
        .catch(err => {
            console.log(err.response.data.errors);
            dispatch(removePostFailure(err.response.data.errors))
        })
};

export const editFilterPost = (postId, filter) => async dispatch => {
    dispatch(editFilterPostBegin());
    await axios.put(`${BASE_URL}/api/posts/${postId}/${filter}`)
        .then(res => {
            if (res.data.success === true) {
                dispatch(editFilterPostSuccess(postId, filter))
            }
        })
        .catch(err => {
            console.log(err.response.data.errors);
            dispatch(editFilterPostFailure(err.response.data.errors))
        })
};

export const setVisibilityFilter = filter => ({
    type: actionsType.SET_VISIBILITY_FILTER,
    filter
});

export const reinitializeState = () => {
    return {
        type:'REINITIALIZE_STATE'
    }
};