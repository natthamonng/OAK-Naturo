import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../actions/alert.actions';
import BreadCrumb from '../../components/Breadcrumb';
import Alert from '../../components/Alert';

const BASE_URL = process.env.REACT_APP_API_URL;

const AddUser = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username:'',
        email: '',
        role: 'visitor'
    });

    const [loading, setLoading] = useState(false);

    const { username, email, role } = formData;

    const onChange = event => {
        setFormData({...formData, [event.target.id]: event.target.value });
    };

    const onSubmit = event => {
        event.preventDefault();
        addNewUser({ username, email, role });
    };

    const addNewUser = (data) => {
        setLoading(true);
        axios.post(`${BASE_URL}/api/users`, data)
            .then(res => {
                setLoading(false);
                if (res.data.success === true) {
                    dispatch(setAlert(res.data.message, 'primary'));
                }
                setFormData({
                    username: '',
                    email: '',
                    role: 'visitor'
                })
            })
            .catch(err => {
                setLoading(false);
                dispatch(setAlert(err.response.data.message, 'danger'));
        })
    };

    return (
        <div className="main-content">
            <BreadCrumb mainName={"Paramètre"} mainPath={"#"} pageName={"Ajouter un nouvel utilisateur"} />
            <div className="separator-breadcrumb border-top"></div>
            <div className="col-md-12">
                <Alert/>
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
                                    { loading ?
                                        <div className="spinner spinner-primary mr-3"></div>
                                        :
                                        <button className="btn btn-primary">Ajouter</button>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AddUser;