import React, { useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getPosts, setNumberHomePage} from '../../actions/post.actions';
import Filter from '../../components/Filter';
import VisiblePostList from '../VisiblePostList/VisiblePostList';
import RecentPostList from '../../components/RecentPostList';
import AddPostForm from '../../components/AddPostForm';
import Spinner from '../../components/Spinner';

const Home = ({ getPosts, posts, page, setNumberHomePage }) => {
    const filters = ['general', 'witness', 'protocol'];
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
                        setNumberHomePage()
                    }
                });
            }).observe(node);
        },
        [setNumberHomePage]
    );

    useEffect(() => {
        if (bottomBoundaryRef.current) {
            scrollObserver(bottomBoundaryRef.current);
            console.log(bottomBoundaryRef)
        }
    }, [scrollObserver, bottomBoundaryRef]);

    return (
        <div className="main-content">
            <section className="widget-app">
                <div className="row">
                    <div className="col-12 col-lg-4  mb-4">
                        <RecentPostList />
                    </div>
                    <div className="col-12 col-lg-8  mb-4">
                        <AddPostForm deFaultFilter={'general'}/>
                        <div className="mt-4"></div>

                        {posts !== [] ?
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

                        { posts.loading &&
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

Home.propTypes = {
    posts: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired,
    getPosts: PropTypes.func.isRequired,
    setNumberHomePage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    posts: state.posts,
    page: state.posts.page
});

export default connect(mapStateToProps,{ getPosts, setNumberHomePage })(Home);