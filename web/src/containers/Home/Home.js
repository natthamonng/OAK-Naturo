import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/post.actions';
import Filter from '../../components/Filter';
import VisiblePostList from '../VisiblePostList/VisiblePostList';
import RecentPostList from '../../components/RecentPostList';
import AddPostForm from '../../components/AddPostForm';
import Spinner from '../../components/Spinner';

const Home = ({ getPosts, posts }) => {
    const filters = ['general', 'witness', 'protocol'];
    useEffect(() => {
        getPosts(filters)
    }, [getPosts]);

    return (
        <div className="main-content">
            <section className="widget-app">
                {posts.loading ?
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center mt-4">
                            <Spinner/>
                        </div>
                    </div>
                :
                    <div className="row">
                        <div className="col-12 col-lg-4  mb-4">
                            <RecentPostList />
                        </div>
                        <div className="col-12 col-lg-8  mb-4">
                            <AddPostForm />
                            <div className="mt-4"></div>
                            <div className="separator-breadcrumb border-top"></div>
                            <div className="breadcrumb d-flex justify-content-end">
                                <Filter />
                            </div>
                            <VisiblePostList />
                        </div>
                    </div>
                }
            </section>
        </div>
    )
};

Home.propTypes = {
    auth: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    posts: state.posts
});

export default connect(mapStateToProps,{ getPosts })(Home);