import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from 'axios';
import { setAlert } from '../../actions/alert.actions';
import Alert from '../../components/Alert';

const BASE_URL = 'http://localhost:8080';

const AddUser = ({ setAlert, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        username:'',
        email: '',
        role: 'visitor'
    });

    const { username, email, role } = formData;

    const onChange = event => {
        setFormData({...formData, [event.target.id]: event.target.value });
    };

    const onSubmit = async event => {
        event.preventDefault();
        addNewUser({ username, email, role });
        setFormData({
            username: '',
            email: '',
            role: 'visitor'
        })
    };

    const addNewUser = ({ username, email, role }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({username, email, role });

        axios.post(`${BASE_URL}/api/users`, body, config)
            .then(res => {
                const success = res.data.success;
                success.forEach(msg => setAlert(msg.message, 'primary'));
            })
            .catch(err => {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach(error => setAlert(error.message, 'danger'));
            }
        })
    };

    return (
        <div className="main-content">
            <div className="breadcrumb">
                <h1>Ajouter un nouvel utilisateur</h1>
                <ul>
                    <li>Paramètre</li>
                    <li>Ajouter un nouvel utilisateur</li>
                </ul>
            </div>
            <div className="separator-breadcrumb border-top"></div>
            <Alert/>
            <div className="col-md-12">
                <div className="card mb-4">
                    <div className="card-body">
                        <div className="card-title mb-3">Ajouter un nouvel utilisateur</div>
                        <form onSubmit={event => onSubmit(event)}>
                            <div className="row">
                                <div className="col-md-6 form-group mb-3">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        className="form-control form-control-rounded"
                                        id="username"
                                        type="text"
                                        placeholder="username"
                                        onChange={event => onChange(event)}
                                        value={username}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 form-group mb-3">
                                    <label htmlFor="email">Adresse mail</label>
                                    <input
                                        className="form-control form-control-rounded"
                                        id="email"
                                        type="email"
                                        placeholder="email"
                                        onChange={event => onChange(event)}
                                        value={email}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 form-group mb-3">
                                    <label htmlFor="picker1">Rôle</label>
                                    <select onChange={event => onChange(event)}
                                            id="role" className="form-control form-control-rounded">
                                        <option value="visitor">Visiteur</option>
                                        <option value="partner">Partenaire</option>
                                        <option value="admin">Administrateur</option>
                                    </select>
                                </div>
                                <div className="col-md-12">
                                    <button className="btn btn-primary">Ajouter</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

AddUser.propTypes = {
    setAlert: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { setAlert }
)(AddUser);