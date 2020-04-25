import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {getPosts, reinitializeState, setGetPostsPage} from '../../actions/post.actions';
import BreadCrumb from '../../components/Breadcrumb';
import Filter from '../../components/Filter';
import VisiblePostList from '../VisiblePostList/VisiblePostList';
import AddPostForm from '../../components/AddPostForm';
import Spinner from '../../components/Spinner';

const Wall = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.posts.loading);
    const page = useSelector(state => state.posts.page);
    const hasMore = useSelector(state => state.posts.hasMore);

    let location = useLocation();
    let filters, defaultFilter, pageName;
    if (location.pathname === '/home') {
        filters  = ['general', 'witness', 'protocol'];
        defaultFilter = 'general';
        pageName = 'Forum de discussions';
    } else if (location.pathname === '/pro') {
        filters = ['pro'];
        defaultFilter = 'pro';
        pageName = 'Espace Pro';
    }

    useEffect(() => {
        dispatch(reinitializeState());
    }, []);

    useEffect(() => {
        if(hasMore){
            dispatch(getPosts(filters, page));
        }          
    }, [page, hasMore]);
    
    const observer = useRef();
    const bottomBoundaryRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                dispatch(setGetPostsPage());
            }
        });

        if (node) observer.current.observe(node);

    }, [loading, hasMore]);

    return (
        <div className="main-content">
            <div className="row">
                <div className="col">
                    <BreadCrumb mainName={"Oak-Naturo"} mainPath={"#"} pageName={pageName} />
                </div>
            </div>
            <div className="separator-breadcrumb border-top"></div>
            <section className="widget-app">
                <div className="row">
                    <div className="col-12 col-lg-10  offset-md-1 mb-4">

                        <AddPostForm deFaultFilter={defaultFilter} />

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

export default Wall;