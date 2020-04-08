import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getPosts} from '../../actions/post.actions';
import AddPostForm from '../../components/AddPostForm';
import VisiblePostList from '../VisiblePostList/VisiblePostList';
import Spinner from '../../components/Spinner';

const WallPro = ({getPosts, loading}) => {
    const filters = ['pro'];
    useEffect(() => {
        getPosts(filters)
    }, [getPosts]);

    return (
        <div className="main-content">
            {/*<div className="breadcrumb">*/}
            {/*    <h1>Espace Pro</h1>*/}
            {/*</div>*/}
            {/*<div className="separator-breadcrumb border-top"></div>*/}
            <div className="col-12 col-md-8 offset-md-2">
                {loading ?
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center mt-4">
                            <Spinner/>
                        </div>
                    </div>
                    :
                    <div>
                        <AddPostForm/>
                        <div className="mt-2"></div>
                        <VisiblePostList/>
                    </div>
                }
            </div>
        </div>

    )
};

WallPro.propTypes = {
    loading: PropTypes.bool.isRequired,
    getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    loading: state.posts.loading
});

export default connect(mapStateToProps,{ getPosts })(WallPro);
