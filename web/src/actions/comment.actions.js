import axios from 'axios';
import { setAlert } from './alert.actions';
import  { ADD_COMMENT_BEGIN, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE } from '../constants/ActionTypes';

const BASE_URL = process.env.REACT_APP_API_URL;

export const addCommentBegin = () => {
    return {
        type: ADD_COMMENT_BEGIN
    }
};

export const addCommentSuccess = ( post ) => ({
    type: ADD_COMMENT_SUCCESS,
    payload: { post }
});

export const addCommentFailure = error => ({
    type: ADD_COMMENT_FAILURE,
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
            console.log(err);
            dispatch(addCommentFailure(err))
        })
};
