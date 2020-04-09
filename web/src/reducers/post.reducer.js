import produce from 'immer';
import  * as actionsType from '../constants/ActionTypes';

const initialState = {
    posts: [],
    loading: false,
    error: null
};

export default (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case actionsType.POSTS_LOADING:
                draft.loading = true;
                draft.error = null;
                break;
            case actionsType.GET_POSTS_SUCCESS:
                draft.posts = action.payload.posts;
                draft.loading =  false;
                break;
            case actionsType.ADD_POST_BEGIN:
            case actionsType.ADD_COMMENT_BEGIN:
                draft.loading = true;
                draft.error =  null;
                break;
            case actionsType.ADD_POST_SUCCESS:
                draft.loading =  false;
                // let posts = state.posts.slice();
                // posts.unshift(action.payload.post);
                let post = action.payload.post;
                draft.posts = [
                    post,
                    ...state.posts
                ];
                break;
            case actionsType.ADD_COMMENT_SUCCESS:
                draft.loading =  false;
                let newPostComment = action.payload.post;
                draft.posts.forEach((element, index) => {
                    if (element.id === newPostComment.id) {
                        draft.posts[index] = newPostComment
                    }
                });
                break;
            case actionsType.ADD_COMMENT_FAILURE:
                draft.error =  action.payload.error;
                draft.loading =  false;
                break;
            case actionsType.GET_POSTS_FAILURE:
                draft.error =  action.payload.error;
                draft.loading =  false;
                draft.posts = [];
                break;
    }
})