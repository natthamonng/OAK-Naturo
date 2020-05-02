import axios from 'axios';
import * as actionsType from '../constants/ActionTypes';

const BASE_URL = process.env.REACT_APP_API_URL;
const defaultErrorMessage = 'Une erreur s\'est produite. Veuillez réessayer plus tard.';

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
    await axios.post(`${BASE_URL}/api/comments`, comment)
        .then(res => {
                dispatch(addCommentSuccess(res.data.result))
        })
        .catch(err => {
            if (err.response) {
                dispatch(addCommentFailure(err.response.data.message));
            } else {
                dispatch(addCommentFailure(defaultErrorMessage));
            }
        })
};

export const removeComment = (postId, commentId) => async dispatch => {
    dispatch(removeCommentBegin());
    await axios.put(`${BASE_URL}/api/comments/${postId}/${commentId}`)
        .then(res => {
            if (res.data.success === true) {
                dispatch(removeCommentSuccess(postId, commentId))
            }
        })
        .catch(err => {
            if (err.response) {
                dispatch(removeCommentFailure(err.response.data.message));
            } else {
                dispatch(removeCommentFailure(defaultErrorMessage));
            }
        })
};