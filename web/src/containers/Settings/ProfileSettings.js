import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { setAlert } from '../../actions/alert.actions';
import Alert from '../../components/Alert';

const BASE_URL = process.env.REACT_APP_API_URL;

const ProfileSettings = ({ setAlert, user }) => {

    return (
        <div className="main-content">
            <div className="breadcrumb">
                <h1>Paramètres du compte</h1>
                <ul>
                    <li>Paramètre</li>
                    <li>Paramètres du compte</li>
                </ul>
            </div>
            <div className="separator-breadcrumb border-top"></div>
            <Alert/>
            <div className="col-md-12">
                <div className="card mb-4">
                    <div className="card-body">
                        <div className="card-title mb-3">Paramètres du compte</div>
                        <div className="not-found-wrap text-center" style={{height: '50vh'}}>
                            <h1 className="text-60">En-cours de production</h1>
                        </div>

                        

                        {/*<form>*/}
                        {/*    <div className="row">*/}
                        {/*        <div className="col-md-6 form-group mb-3">*/}
                        {/*            <label htmlFor="username">Username</label>*/}
                        {/*            <input*/}
                        {/*                className="form-control form-control-rounded"*/}
                        {/*                id="username"*/}
                        {/*                type="text"*/}
                        {/*                placeholder="username"*/}
                        {/*                required*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*        <div className="col-md-6 form-group mb-3">*/}
                        {/*            <label htmlFor="email">Adresse mail</label>*/}
                        {/*            <input*/}
                        {/*                className="form-control form-control-rounded"*/}
                        {/*                id="email"*/}
                        {/*                type="email"*/}
                        {/*                placeholder="email"*/}
                        {/*                required*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*        <div className="col-md-12">*/}
                        {/*            <button className="btn btn-primary">Modifier</button>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</form>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

ProfileSettings.propTypes = {
    setAlert: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(
    mapStateToProps,
    { setAlert }
)(ProfileSettings);