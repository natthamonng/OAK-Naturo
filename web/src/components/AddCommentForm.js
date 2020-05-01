import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addNewComment } from '../actions/comment.actions';
import Spinner from './Spinner';

const AddCommentForm = (props) => {
    const {postId, userId, addCommentLoading, addNewComment} = props;

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

                { addCommentLoading ?
                    <Spinner/>
                    :
                    <button className="btn btn-icon btn-rounded btn-primary ml-2">
                        <i className="i-Paper-Plane"></i>
                    </button>
                }
            </div>
        </form>
    )
};

AddCommentForm.propTypes = {
    addCommentLoading: PropTypes.bool.isRequired,
    addNewComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    addCommentLoading: state.posts.addCommentLoading
});

export default connect(mapStateToProps, {addNewComment})(AddCommentForm);