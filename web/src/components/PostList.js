import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Post from './Post';

const PostList = ({posts, auth: user}) => {
    const postList = posts.map(post => {
        return <Post key={post.id} post={post} user={user}/>
    });
    return (
        <div>
            { postList }
        </div>
    )
};

PostList.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PostList);
