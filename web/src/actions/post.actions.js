import axios from 'axios';
import { setAlert } from "./alert.actions";
import  * as actionsType from '../constants/ActionTypes';

const BASE_URL = process.env.REACT_APP_API_URL;

export const setPostsLoading = () => {
    return {
        type: actionsType.POSTS_LOADING
    }
};

export const getPostsSuccess = posts => ({
    type: actionsType.GET_POSTS_SUCCESS,
    payload: { posts }
});

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

export const getPosts = (filters) => async dispatch => {
    dispatch(setPostsLoading());
    await axios.get(`${BASE_URL}/api/posts/${filters}`)
        .then( res => {
            dispatch(getPostsSuccess(res.data))
        })
        .catch(err => {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
            }
            dispatch(getPostsFailure(err))
        })
};

export const addNewPost = (post) => async dispatch => {
    dispatch(addPostBegin());
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    const body = post;
    await axios.post(`${BASE_URL}/api/posts`, body, config)
        .then(res => {
            dispatch(addPostSuccess(res.data))
        })
        .catch(err => {
            console.log(err);
            // const errors = err.response.data.errors;
            // if (errors) {
            //     errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
            // }
            dispatch(addPostFailure(err))
        })
};

export const removePost = (postId) => async dispatch => {
    dispatch(removePostBegin());
    await axios.put(`${BASE_URL}/api/post/${postId}`)
        .then(res => {
            if (res.data.success === true) {
                dispatch(removePostSuccess(postId))
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(removePostFailure(err))
        })
};

export const setVisibilityFilter = filter => ({
    type: actionsType.SET_VISIBILITY_FILTER,
    filter
});

export const VisibilityFilters = {
    ALL: 'ALL',
    GENERAL: 'GENERAL',
    WITNESS: 'WITNESS',
    PROTOCOL: 'PROTOCOL',
    PRO: 'PRO'
};
