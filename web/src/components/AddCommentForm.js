import React, {useState} from 'react';
import {connect, useSelector} from 'react-redux';
import { addNewComment} from '../actions/comment.actions';

const AddCommentForm = ({ postId, addNewComment}) => {
    const userId = useSelector(state => state.auth.user.id);
    const commentLoading = useSelector(state => state.posts.commentLoading);
    const [formData, setFormData] = useState({
        user_id: userId,
        post_id: postId,
        comment: ''
    });

    const { user_id, post_id, comment } = formData;

    const onChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value });
    };

    const onSubmit = event => {
        event.preventDefault();
        if (comment.length === 0 ){
            return;
        }
        addNewComment({ user_id, post_id, comment });
        setFormData((previousState) => {
            return {
                ...previousState,
                comment: ''
            }
        })
    };

    return (
        <form className="inputForm" onSubmit={event => onSubmit(event)}>
            <div className="form-group d-flex flex-row">
                <input className="form-control form-control-rounded" type="text"
                       name="comment"
                       placeholder="Votre commentaire ..."
                       onChange={event => onChange(event)}
                       value={comment}
                />

                { commentLoading ?
                    <div className="spinner spinner-primary mr-3"></div>
                    :
                    <button className="btn btn-icon btn-rounded btn-primary ml-2">
                        <i className="i-Paper-Plane"></i>
                    </button>
                }
            </div>
        </form>
    )
};

export default connect( null, { addNewComment })(AddCommentForm);