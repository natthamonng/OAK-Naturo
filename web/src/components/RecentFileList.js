import React from 'react';
import { useSelector } from 'react-redux';
import RecentFile from './RecentFile';

const RecentFileList = () => {
    // const posts = useSelector(state => state.posts.posts);
    // const maxLatestPosts = 5;
    // let recentPostsList = undefined;
    // if (!posts.loading) {
    //     recentPostsList = posts.slice(0, maxLatestPosts).map(post => {
    //         return <RecentFile key={post.id} post={post} />
    //     });
    // }

    return (
        <div className="card">
            <div className="card-body">
                <div className="card-title">Derniers Documents</div>
                <div className="ul-widget-app__recent-messages">
                    {/*{ recentPostsList }*/}
                </div>
            </div>
        </div>
    )
};

export default RecentFileList;