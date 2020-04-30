import produce from 'immer';
import  * as actionsType from '../constants/ActionTypes';

const initialState = {
    posts: [],
    postCount: 0,
    page: 1,
    hasMore: true,
    loading: false,
    addPostLoading: false,
    removePostLoading: false,
    changeFilterLoading: false,
    addCommentLoading: false,
    removeCommentLoading: false,
    error: null
};

export default (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case actionsType.REINITIALIZE_STATE:
                draft.posts = [];
                draft.page = 1;
                draft.postCount = 0;
                draft.hasMore = true;
                break;
            case actionsType.POSTS_LOADING:
                draft.loading = true;
                draft.error = null;
                break;
            case actionsType.GET_POSTS_SUCCESS:
                draft.postCount = action.payload.count;
                let ids = new Set(state.posts.map(post => post.id));
                let merged = [...draft.posts, ...action.payload.posts.filter(post => !ids.has(post.id))];
                draft.posts = merged;
                draft.hasMore = !(draft.postCount <= draft.posts.length);
                // draft.posts = state.posts.concat(action.payload.posts);
                draft.loading =  false;
                break;
            case actionsType.SET_GET_POST_PAGE:
                if (draft.hasMore) {
                    draft.page = state.page + 1;
                }
                break;
            case actionsType.ADD_POST_BEGIN:
                draft.addPostLoading = true;
                draft.error = null;
                break;
            case actionsType.REMOVE_POST_BEGIN:
                draft.removePostLoading = true;
                draft.error = null;
                break;
            case actionsType.CHANGE_FILTER_POST_BEGIN:
                draft.changeFilterLoading = true;
                draft.error = null;
                break;
            case actionsType.ADD_COMMENT_BEGIN:
                draft.addCommentLoading = true;
                draft.error = null;
                break;
            case actionsType.REMOVE_COMMENT_BEGIN:
                draft.removeCommentLoading = true;
                draft.error = null;
                break;
            case actionsType.ADD_POST_SUCCESS:
                draft.addPostLoading =  false;
                // let posts = state.posts.slice();
                // posts.unshift(action.payload.post);
                let post = action.payload.post;
                draft.posts = [
                    post,
                    ...state.posts
                ];
                break;
            case actionsType.REMOVE_POST_SUCCESS:
                draft.removePostLoading = false;
                let removedPostId = action.payload.postId;
                draft.posts = state.posts.filter(function(element) {
                    return element.id !== removedPostId;
                });
                break;
            case actionsType.CHANGE_FILTER_POST_SUCCESS:
                draft.changeFilterLoading = false;
                let objPostIndex = state.posts.findIndex((post => post.id === action.payload.postId));
                draft.posts[objPostIndex].filter = action.payload.filter;
                break;
            case actionsType.ADD_COMMENT_SUCCESS:
                draft.addCommentLoading =  false;
                let newPostComment = action.payload.post;
                draft.posts.forEach((element, index) => {
                    if (element.id === newPostComment.id) {
                        draft.posts[index] = newPostComment
                    }
                });
                break;
            case actionsType.REMOVE_COMMENT_SUCCESS:
                draft.removeCommentLoading = false;
                let removedCommentId = action.payload.commentId;
                let objIndex = state.posts.findIndex((post => post.id === action.payload.postId));
                let copyPostsArray = [...draft.posts];
                copyPostsArray[objIndex].comments = copyPostsArray[objIndex].comments.filter(function(comment) {
                    return comment.id !== removedCommentId
                });
                draft.posts = copyPostsArray;
                break;
            case actionsType.ADD_POST_FAILURE:
                draft.error =  action.payload.error;
                draft.addPostLoading =  false;
                break;
            case actionsType.CHANGE_FILTER_POST_FAILURE:
                draft.error =  action.payload.error;
                draft.changeFilterLoading =  false;
                break;
            case actionsType.REMOVE_POST_FAILURE:
                draft.error =  action.payload.error;
                draft.removePostLoading =  false;
                break;
            case actionsType.ADD_COMMENT_FAILURE:
                draft.error =  action.payload.error;
                draft.addCommentLoading =  false;
                break;
            case actionsType.REMOVE_COMMENT_FAILURE:
                draft.error =  action.payload.error;
                draft.removeCommentLoading =  false;
                break;
            case actionsType.GET_POSTS_FAILURE:
                draft.error =  action.payload.error;
                draft.loading =  false;
                draft.posts = [];
                break;
    }
})