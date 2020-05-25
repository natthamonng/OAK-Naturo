import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export default function useManageUsers() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [users, setUsers] = useState([]);
    const [isEdited, setIsEdited] = useState(false);

    useEffect(() => {
        setUsers([]);
    }, []);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        setLoading(true);
        setError(false);
        axios.get(`${BASE_URL}/api/users`)
            .then(res => {
                setUsers(res.data.users);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                setError(true);
            })
    };

    const editUserProfile = (data, id) => {
        setLoading(true);
        setError(false);
        setIsEdited(false);
        axios.put(`${BASE_URL}/api/users/editProfile/${id}`, data)
            .then(res => {
                if (res.data.success === true){
                    setLoading(false);
                    setIsEdited(true);
                    getUsers()
                }
            })
            .catch(err => {
                setLoading(false);
                setError(true);
                setIsEdited(false);
            })
    };

    return { loading, error, users, isEdited, editUserProfile }
}