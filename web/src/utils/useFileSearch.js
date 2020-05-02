import { useEffect, useState } from 'react'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL;

export default function useFileSearch(query) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [files, setFiles] = useState([]);
    const [total, setTotal] = useState(null);

    useEffect(() => {
        setFiles([]);
        setTotal(null);
    }, [query]);

    useEffect(() => {
        if (query.length < 3) return;
        setLoading(true);
        setError(false);
        let cancel;
        axios({
            method: 'GET',
            url: `${BASE_URL}/api/documentation/search?keyword=${query}`,
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setFiles(res.data.result.rows);
            setTotal(res.data.result.count);
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return;
            setLoading(false);
            setError(true)
        });
        return () => cancel()
    }, [query]);

    return { loading, error, files, total }
}