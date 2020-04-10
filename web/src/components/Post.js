import React  from 'react';
import Moment from 'react-moment';
import Avatar from './Avatar';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import Comment from './Comment';

const Post = ({post, user}) => {
    const postId = post.id;
    const images = post.images;
    const comments = post.comments;

    let album  = images.map(image => {
        const url = 'data:image/png;base64,' + new Buffer(image.image.data, 'binary').toString('base64');
        return (
            <div key={image.id} className="col-12 col-md-6 col-lg-4">
                <img key={image.id} src={ url } className="rounded mb-3" alt={image.name} />
            </div>
        )
    });

    let commentsList  = comments.map(comment => {
        return (
            <Comment key={comment.id} comment={comment} />
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
                </div>

                <div className="border-bottom">
                    <p className="card-text pb-2">
                        { post.content }
                    </p>
                    { album !== undefined &&
                        <div className="row">
                            { album }
                        </div>
                    }
                    <a className="badge badge-light text-white m-2" href="#">
                        { post.filter === 'general' && <><i className="i-Globe"></i> Général</> }
                        { post.filter === 'witness' && <><i className="i-Business-ManWoman"></i> Témoignage</> }
                        { post.filter === 'protocol' && <><i className="i-Conference"></i> Protocole</> }
                        { post.filter === 'pro' && <><i className="i-Bar-Chart"></i> Pro</> }
                    </a>
                </div>

                <div className="pt-2">
                    <CommentForm postId={postId} />
                    <div>
                        { commentsList }
                        {/*<CommentList />*/}
                    </div>

                </div>
            </div>
        </div>
    )
};

export default Post;