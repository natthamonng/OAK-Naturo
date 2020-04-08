import React from 'react';
import AddPostForm from '../../components/AddPostForm';
import Spinner from '../../components/Spinner';
import VisiblePostList from "../VisiblePostList/VisiblePostList";

const Wall = () => {

    return (

        <div className="main-content">
            <div className="breadcrumb">
                <h1></h1>
            </div>
            <div className="separator-breadcrumb border-top"></div>
            <div className="col-12 col-md-8 offset-md-2">
                <AddPostForm />
                <VisiblePostList />
            </div>
        </div>

    )
};

export default Wall;
