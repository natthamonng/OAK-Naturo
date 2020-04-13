import axios from 'axios';
import { setAlert } from './alert.actions';
import * as actionsType from '../constants/ActionTypes';

const BASE_URL = process.env.REACT_APP_API_URL;

export const addCommentBegin = () => {
    return {
        type: actionsType.ADD_COMMENT_BEGIN
    }
};

export const addCommentSuccess = ( post ) => ({
    type: actionsType.ADD_COMMENT_SUCCESS,
    payload: { post }
});

export const addCommentFailure = error => ({
    type: actionsType.ADD_COMMENT_FAILURE,
    payload: { error }
});

export const removeCommentBegin = () => {
    return {
        type: actionsType.REMOVE_COMMENT_BEGIN
    }
};

export const removeCommentSuccess = ( postId, commentId ) => ({
    type: actionsType.REMOVE_COMMENT_SUCCESS,
    payload: { postId, commentId }
});

export const removeCommentFailure = error => ({
    type: actionsType.REMOVE_COMMENT_FAILURE,
    payload: { error }
});

export const addNewComment = (comment) => async dispatch => {
    dispatch(addCommentBegin());
    const body = comment;
    await axios.post(`${BASE_URL}/api/comment`, body)
        .then(res => {
                dispatch(addCommentSuccess(res.data))
        })
        .catch(err => {
            console.log(err.response.data.errors);
            dispatch(addCommentFailure(err.response.data.errors))
        })
};

export const removeComment = (postId, commentId) => async dispatch => {
    dispatch(removeCommentBegin());
    await axios.put(`${BASE_URL}/api/comment/${postId}/${commentId}`)
        .then(res => {
            if (res.data.success === true) {
                dispatch(removeCommentSuccess(postId, commentId))
            }
        })
        .catch(err => {
            console.log(err.response.data.errors);
            dispatch(removeCommentFailure(err.response.data.errors))
        })
};