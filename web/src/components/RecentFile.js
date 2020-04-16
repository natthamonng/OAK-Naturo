import React from 'react';
import Avatar from '../components/Avatar';
import Moment from 'react-moment';

const RecentFile = ({post}) => {
    return (
        <div className="ul-widget-app__row-comments border-bottom-gray-200 mb-0">
            <div className="ul-widget-app__profile-pic mr-3">
                <Avatar username={post.author.username} />
            </div>
            <div className="ul-widget-app__comment">
                <div className="ul-widget-app__profile-title">
                    <h6 className="heading">{post.author.username} </h6>
                    <p className="mb-2">
                        { post.content.length > 80 ?
                            <>
                            {post.content.slice(0, 80)}
                            {'...'}
                            </>
                            :
                            post.content
                        }
                    </p>
                </div>
                <div className="ul-widget-app__profile-status">
                    <div className="badge badge-light text-white m-2">
                        { post.filter === 'general' && <><i className="i-Globe"></i> Général</> }
                        { post.filter === 'witness' && <><i className="i-Business-ManWoman"></i> Témoignage</> }
                        { post.filter === 'protocol' && <><i className="i-Conference"></i> Protocole</> }
                        { post.filter === 'pro' && <><i className="i-Bar-Chart"></i> Pro</> }
                    </div>
                    <div className="flex-grox-1"></div>
                    <small className="text-mute"><Moment fromNow>{ post.createdAt }</Moment></small>
                </div>
            </div>
        </div>
    )
};

export default RecentFile;