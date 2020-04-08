import { POSTS_LOADING, GET_POSTS_SUCCESS, GET_POSTS_FAILURE } from '../constants/ActionTypes';

const initialState = {
    posts: [],
    loading: false,
    error: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case POSTS_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: payload.posts,
                loading: false
            };
        case GET_POSTS_FAILURE:
            return {
                ...state,
                error: payload.error,
                loading: false,
                posts: []
            };
        default:
            return state;
    }
}