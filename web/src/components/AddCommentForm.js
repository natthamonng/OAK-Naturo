import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNewComment } from '../actions/comment.actions';
import Spinner from './Spinner';

const AddCommentForm = ({ postId, userId }) => {
    const dispatch = useDispatch();
    const addCommentLoading = useSelector(state => state.posts.addCommentLoading);
    const [comment, setComment] = useState("");

    const handleOnCommentChange = event => {
        setComment(event.target.value)
    };

    const onSubmit = event => {
        event.preventDefault();
        if (comment.length === 0 ) return;
        dispatch(addNewComment({
            user_id: userId,
            post_id: postId,
            comment
        }));
        setComment("")
    };

    return (
        <form className="inputForm" onSubmit={event => onSubmit(event)}>
            <div className="form-group d-flex flex-row">
                <input className="form-control form-control-rounded  mr-2" type="text"
                       name="comment"
                       placeholder="Votre commentaire ..."
                       onChange={handleOnCommentChange}
                       value={comment}
                />

                <button className="btn btn-icon btn-rounded btn-primary">
                    <i className="i-Paper-Plane"></i>
                </button>

            </div>
        </form>
    )
};

export default AddCommentForm;