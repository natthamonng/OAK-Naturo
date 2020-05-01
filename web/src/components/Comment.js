import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { removeComment } from '../actions/comment.actions';
import Avatar from "./Avatar";
import Moment from "react-moment";

const Comment = ({ comment, postId, removeComment }) => {
    const user = useSelector(state => state.auth.user);
    const [showAdminMenu, setShowAdminMenu] = useState(false);

    return (
        <div className="p-2 mb-2 user border-top">
            <div className="float-left mr-2">
                <Avatar username={comment.author.username}/>
            </div>
            { (user.role === 'admin' || user.id === comment.user_id) &&
            <button className={`dropdown border-0 bg-white ${showAdminMenu? 'show' : ''} float-right ml-1`}
                    style={{cursor: 'pointer', outline: 'none'}}
                    onClick={()=> {setShowAdminMenu(!showAdminMenu)}}
                    onBlur={()=> {setShowAdminMenu(false)}} >
                <i className="i-Remove header-icon" id="dropdownMenuButton"
                   role="button" data-toggle="dropdown" aria-haspopup="true"
                   aria-expanded={`${showAdminMenu? 'true' : 'false'}`}>
                </i>
                <div className={`dropdown-menu dropdown-menu-right ${showAdminMenu? 'show' : ''}`}
                     aria-labelledby="dropdownMenuButton">
                    <div className="dropdown-item" onClick={() => removeComment(postId, comment.id)}>
                        Supprimer
                    </div>
                </div>
            </button>
            }
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

export default connect( null, { removeComment })(Comment);