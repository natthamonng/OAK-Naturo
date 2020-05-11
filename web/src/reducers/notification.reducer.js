import { SET_NOTIFICATION, REMOVE_NOTIFICATION } from '../constants/ActionTypes';

const initialState = [];

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_NOTIFICATION:
            let notifIndex = state.findIndex(notif => notif.postId === payload.detail.postId);
            if (notifIndex === -1) {
                // Object not exists
                return [...state, payload];
            }
            break;
        case REMOVE_NOTIFICATION:
            return state.filter(notif => notif.id !== payload);
        default:
            return state;
    }
}