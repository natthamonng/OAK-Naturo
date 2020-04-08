import axios from 'axios';
import { setAlert } from "./alert.actions";
import  {   POSTS_LOADING, GET_POSTS_SUCCESS, GET_POSTS_FAILURE, SET_VISIBILITY_FILTER,
            ADD_POST_BEGIN, ADD_POST_SUCCESS, ADD_POST_FAILURE
        } from '../constants/ActionTypes';

const BASE_URL = process.env.REACT_APP_API_URL;

export const setPostsLoading = () => {
    return {
        type: POSTS_LOADING
    }
};

export const getPostsSuccess = posts => ({
    type: GET_POSTS_SUCCESS,
    payload: { posts }
});

export const getPostsFailure = error => ({
    type: GET_POSTS_FAILURE,
    payload: { error }
});

export const addPostBegin = () => {
    return {
        type: ADD_POST_BEGIN
    }
};

export const addPostSuccess = ( posts ) => ({
    type: ADD_POST_SUCCESS,
    payload: { posts }
});

export const addPostFailure = error => ({
    type: ADD_POST_FAILURE,
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

export const addNewPost = (data) => async dispatch => {
    dispatch(addPostBegin());
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    const body = data;
    await axios.post(`${BASE_URL}/api/posts`, body, config)
    // TODO
};

export const setVisibilityFilter = filter => ({
    type: SET_VISIBILITY_FILTER,
    filter
});

export const VisibilityFilters = {
    ALL: 'ALL',
    GENERAL: 'GENERAL',
    WITNESS: 'WITNESS',
    PROTOCOL: 'PROTOCOL',
    PRO: 'PRO'
};
