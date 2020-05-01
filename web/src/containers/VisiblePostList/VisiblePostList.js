import { connect } from 'react-redux';
import PostList from '../../components/PostList';
import { VisibilityFilters } from '../../constants/PostFilters';

const getVisiblePosts = (posts, filter) => {
    switch (filter) {
        case VisibilityFilters.ALL:
            return posts;
        case VisibilityFilters.GENERAL:
            return posts.filter(posts => posts.filter === 'general');
        case VisibilityFilters.WITNESS:
            return posts.filter(posts => posts.filter === 'witness');
        case VisibilityFilters.PROTOCOL:
            return posts.filter(posts => posts.filter === 'protocol');
        case VisibilityFilters.PRO:
            return posts.filter(posts => posts.filter === 'pro');
        default:
            throw new Error('Unknown filter: ' + filter)
    }
};

const mapStateToProps = state => ({
    posts: getVisiblePosts(state.posts.posts, state.visibilityFilter),
    user: state.auth.user
});

export default connect(mapStateToProps)(PostList)