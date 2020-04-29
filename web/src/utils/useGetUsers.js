import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export default function useGetUsers() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers([]);
    }, []);

    useEffect(() => {
        setLoading(true);
        setError(false);
        axios.get(`${BASE_URL}/api/users`)
            .then(res => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                setError(true);
            })
    }, []);

    return { loading, error, users }
}