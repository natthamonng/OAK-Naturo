import React, { useState } from 'react';
import {connect, useSelector} from 'react-redux';
import { useLocation } from 'react-router-dom';
import { removePost } from '../actions/post.actions';
import Moment from 'react-moment';
import Avatar from './Avatar';
import AddCommentForm from './AddCommentForm';
import Comment from './Comment';
import ChangeFilterModal from './ChangeFilterModal';
import ModalImage from 'react-modal-image';

const Post = ({ post, removePost }) => {
    let location = useLocation();
    const user = useSelector(state => state.auth.user);
    const [showDeleteMenu, setShowDeleteMenu] = useState(false);

    const postId = post.id;
    const images = post.images;
    const comments = post.comments;

    let album  = images.map(image => {
        const url = 'data:image/png;base64,' + new Buffer(image.image.data, 'binary').toString('base64');
        return (
            <div key={image.id} className="col-12 col-md-6" style={{cursor: 'pointer'}}>
                <ModalImage
                    key={image.id}
                    className="rounded mb-3"
                    small={url}
                    large={url}
                    alt={image.name}
                />
            </div>
        )
    });

    let commentsList  = comments.map(comment => {
        return (
            <Comment key={comment.id} comment={comment} postId={postId} />
        )
    });

    return (

        <div className="card mb-2 p-2">
            <div className="card-body pb-0">
                <div className="d-flex align-items-start">
                    <Avatar username={ post.author.username } />
                    {/*<img className="avatar-sm rounded-circle mr-2" src={face} alt="alt"/>*/}
                    <div className="ml-2">
                        <p className="m-0 text-title text-16 flex-grow-1">{ post.author.username }</p>
                        <p className="text-muted text-small"><Moment fromNow>{ post.createdAt }</Moment></p>
                    </div>
                    <div className="flex-grow-1"></div>
                    { (user.role === 'admin' || user.id === post.user_id) &&
                    <button className={`dropdown border-0 bg-white ${showDeleteMenu? 'show' : ''}`}
                            style={{cursor: 'pointer', outline: 'none'}}
                            onClick={()=> {setShowDeleteMenu(!showDeleteMenu)}}
                            onBlur={()=> {setShowDeleteMenu(false)}} >
                        <i className="i-Arrow-Down header-icon" id="dropdownMenuButton"
                           role="button" data-toggle="dropdown" aria-haspopup="true"
                           aria-expanded={`${showDeleteMenu? 'true' : 'false'}`}>
                        </i>
                        <div className={`dropdown-menu dropdown-menu-right ${showDeleteMenu? 'show' : ''}`}
                             aria-labelledby="dropdownMenuButton">
                            <div className="dropdown-item" onClick={() => removePost(postId)}>
                                Supprimer
                            </div>
                        </div>
                    </button>
                    }
                </div>

                <div className="border-bottom">
                    <p className="card-text pb-2">
                        { post.content }
                    </p>

                    { album &&
                        <div className="row">
                                { album }
                        </div>
                    }

                    <div className="badge badge-light text-white m-2">
                        { post.filter === 'general' && <><i className="i-Globe"></i> Général</> }
                        { post.filter === 'witness' && <><i className="i-Business-ManWoman"></i> Témoignage</> }
                        { post.filter === 'protocol' && <><i className="i-Conference"></i> Protocole</> }
                        { post.filter === 'pro' && <><i className="i-Bar-Chart"></i> Pro</> }
                    </div>
                    { (user.role === "admin" && location.pathname === '/home') && <ChangeFilterModal post={post}/> }
                </div>

                <div className="pt-2">
                    <AddCommentForm postId={postId} />
                    <div>
                        { commentsList }
                    </div>
                </div>
            </div>
        </div>

    )
};

export default connect( null, { removePost })(Post);