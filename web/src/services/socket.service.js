import io from 'socket.io-client';
import store from '../store/store';
import {editFilterPostSuccess, getPostFromSocket, removePostSuccess} from '../actions/post.actions';
import {removeCommentSuccess} from '../actions/comment.actions';

const BASE_URL = process.env.REACT_APP_API_URL;

export const socketService = {
    createSocketConnection: createSocketConnection,
    disconnectSocket: disconnectSocket
};

let socket;

function createSocketConnection() {
    const state = store.getState();
    const user = state.auth.user;

    if(!user) return;

    let namespace;
    if (user.role === 'visitor') {
        namespace = '/visitor'
    } else {
        namespace = '/pro'
    }

    socket = io(`${BASE_URL}${namespace}`);

    socket.on('new post', newPost => {
        if (newPost.authorId !== user.id) {
            store.dispatch(getPostFromSocket(newPost.postId, 'post'))
        }
    });
    socket.on('unpublish post', post => {
        store.dispatch(removePostSuccess(post.postId));
    });
    socket.on('update filter post', post => {
        store.dispatch(editFilterPostSuccess(post.postId, post.filter));
    });

    socket.on('new comment', newComment => {
        store.dispatch(getPostFromSocket(newComment.postId, 'comment'));
    });
    socket.on('unpublish comment', comment => {
        store.dispatch(removeCommentSuccess(comment.postId, comment.commentId ));
    });
}

function disconnectSocket() {
    socket.disconnect();
}



