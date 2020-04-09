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
    }, []);

    return (
        <div className="main-content">
            <section className="widget-app">
                { posts.loading ?
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center mt-4">
                            <Spinner/>
                        </div>
                    </div>
                :
                    <div className="row">
                        <div className="col-12 col-lg-4  mb-4">
                            {/*<RecentPostList />*/}
                        </div>
                        <div className="col-12 col-lg-8  mb-4">
                            <AddPostForm />
                            <div className="mt-4"></div>

                            {posts.length > 0 ?
                                <>
                                <div className="separator-breadcrumb border-top"></div>
                                <div className="breadcrumb d-flex justify-content-end">
                                    <Filter />
                                </div>
                                </>
                                :
                                <div className="d-flex justify-content-center align-items-center" style={{height: '200px'}}>
                                    <h1 className="font-weight-bold text-muted">
                                        Partagez votre première Story sur Oak !
                                        {' '}
                                        <i className="i-Smile"></i>
                                    </h1>
                                </div>
                            }
                            <VisiblePostList />
                        </div>
                    </div>
                }
            </section>
        </div>
    )
};

Home.propTypes = {
    posts: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    posts: state.posts
});

export default connect(mapStateToProps,{ getPosts })(Home);