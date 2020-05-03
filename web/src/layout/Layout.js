import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signOutUser } from '../actions/auth.actions';
import Navbar from '../components/Navbar';
import MainRoutes from '../routes/MainRoutes';
import Footer from '../components/Footer';

const Layout = (props) => {
    return (
        <div className="app-admin-wrap layout-horizontal-bar">
            <Navbar {...props} />
            <div className="main-content-wrap d-flex flex-column">
                <MainRoutes />
            <Footer/>
            </div>
        </div>
    )
};

Layout.propTypes = {
    auth: PropTypes.object.isRequired,
    signOutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps,{ signOutUser })(Layout);
