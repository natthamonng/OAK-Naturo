import React from 'react';
import Avatar from "./Avatar";
import Moment from "react-moment";

const Comment = ({ comment }) => {
    return (
        <div className="p-2 mb-2 user border-top">
            <div className="float-left mr-2">
                <Avatar username={comment.author.username}/>
            </div>
            <div className="message">
                <div>
                    <span className="mb-1 text-title font-weight-bold">{comment.author.username}</span>
                    {' '}
                    <span className="m-0">{comment.comment}</span>
                </div>
            </div>
            <span className="text-small text-muted"><Moment fromNow>{ comment.createdAt }</Moment></span>
        </div>
    )
};

export default Comment;