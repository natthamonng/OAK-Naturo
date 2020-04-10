import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Post from './Post';

const PostList = ({ posts }) => {
    const postList = posts.map(post => {
        return <Post key={post.id} post={post} />
    });
    return (
        <div>
            { postList }
        </div>
    )
};

// PostList.propTypes = {
//     auth: PropTypes.object.isRequired
// };
//
// const mapStateToProps = state => ({
//     auth: state.auth
// });
//
// export default connect(mapStateToProps)(PostList);
export default PostList;