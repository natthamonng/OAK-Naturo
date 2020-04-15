import React from 'react';
import Post from './Post';

const PostList = ({ posts }) => {
    const postList = posts.map((post, index) => {
        return <Post key={`${post.id}-${index}`} post={post} />
    });
    return (
        <div>
            { postList }
        </div>
    )
};

export default PostList;