import { v4 as uuidv4 } from 'uuid';
import { SET_NOTIFICATION, REMOVE_NOTIFICATION } from '../constants/ActionTypes';

export const setNotification = (detail) => dispatch => {
    const id = uuidv4();
    dispatch({
        type: SET_NOTIFICATION,
        payload: { detail, id }
    });
};

export const removeNotification = (id) => dispatch => {
    dispatch({ type: REMOVE_NOTIFICATION, payload: id})
};