import React, {useState} from 'react';

const CommentForm = ({user, postId, addNewComment}) => {
    const [formData, setFormData] = useState({
        user_id: user.id,
        post_id: postId,
        comment: ''
    });

    const { user_id, post_id, comment } = formData;

    const onChange = event => {
        setFormData({...formData, [event.target.id]: event.target.value });
    }

    const onSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
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
    }

    return (
        <form className="inputForm" onSubmit={event => onSubmit(event)}>
            <div className="form-group d-flex flex-row">
                {/*<img className="avatar-sm rounded-circle mr-2" src={face} alt="alt"/>*/}
                <input className="form-control form-control-rounded" type="text"
                       placeholder="Votre commentaire ..."
                       onChange={event => onChange(event)}
                       value={comment}
                />
                <button className="btn btn-icon btn-rounded btn-primary ml-2">
                    <i className="i-Paper-Plane"></i>
                </button>
            </div>
        </form>
    )
}

export default CommentForm;