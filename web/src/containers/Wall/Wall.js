import React, { useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {getPosts, reinitializeState, setGetPostsPage} from '../../actions/post.actions';
import Filter from '../../components/Filter';
import VisiblePostList from '../VisiblePostList/VisiblePostList';
import AddPostForm from '../../components/AddPostForm';
import Spinner from '../../components/Spinner';

const Wall = ({ getPosts, loading, page, setGetPostsPage, reinitializeState }) => {
    let location = useLocation();
    let filters;
    if (location.pathname === '/home') {
        filters  = ['general', 'witness', 'protocol'];
    } else if (location.pathname === '/pro') {
        filters = ['pro']
    }

    useEffect(() => {
        reinitializeState();
    }, []);

    useEffect(() => {
        getPosts(filters, page);
    }, [getPosts, page]);

    // implement infinite scrolling with intersection observer
    let bottomBoundaryRef = useRef(null);

    const scrollObserver = useCallback(
        node => {
            new IntersectionObserver(entries => {
                entries.forEach(en => {
                    if (en.intersectionRatio > 0) {
                        setGetPostsPage()
                    }
                });
            }).observe(node);
        },
        [setGetPostsPage]
    );

    useEffect(() => {
        if (bottomBoundaryRef.current) {
            scrollObserver(bottomBoundaryRef.current);
        }
    }, [scrollObserver, bottomBoundaryRef]);

    return (
        <div className="main-content">
            <section className="widget-app">
                <div className="row">
                    <div className="col-12 col-lg-8  offset-md-2 mb-4">
                        <AddPostForm deFaultFilter={'general'}/>
                        <div className="mt-4"></div>
                        { location.pathname === '/home' &&
                            <>
                                <div className="separator-breadcrumb border-top"></div>
                                <div className="breadcrumb d-flex justify-content-end">
                                    <Filter />
                                </div>
                            </>
                        }

                        <VisiblePostList />

                        { loading &&
                            <div className="row">
                                <div className="col-12 d-flex justify-content-center mt-4">
                                    <Spinner/>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </section>
            <div id="page-bottom-boundary" ref={bottomBoundaryRef}></div>
        </div>
    )
};

Wall.propTypes = {
    loading: PropTypes.bool.isRequired,
    page: PropTypes.number.isRequired,
    getPosts: PropTypes.func.isRequired,
    setGetPostsPage: PropTypes.func.isRequired,
    reinitializeState: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    loading: state.posts.loading,
    page: state.posts.page
});

export default connect(mapStateToProps,{ getPosts, setGetPostsPage, reinitializeState })(Wall);