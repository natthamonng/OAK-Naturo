import React, { useState, useRef } from 'react';
import useFileSearch from '../utils/useFileSearch';
import Logo from '../assets/images/acorn.png';
import SearchResultList from "./SearchResultList";

const Search = () => {
    const [searchModeOpen, setSearchModeOpen] = useState(false);
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

    const {
        files,
        total,
        loading,
        error
    } = useFileSearch(query);

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <>
        <div className="input-group mb-3">
            <input className="form-control" type="text" placeholder="Rechercher..."
                   aria-label="searchBar" aria-describedby="searchBar"
                   onFocus={()=> setSearchModeOpen(true)}
                   onClick={() => inputRef.current.focus()}/>
            <div className="input-group-append">
                <span className="input-group-text bg-transparent" id="searchBar">
                    <i className="i-Magnifi-Glass1"></i>
                </span>
            </div>
        </div>

        <div className={`search-ui ${searchModeOpen? 'open' : ''}`}>
            <div className="search-header">
                <img src={Logo} alt="logo" className="logo"/>
                <button className="search-close btn btn-icon bg-transparent float-right mt-2"
                        onClick={()=> setSearchModeOpen(false)}>
                    <i className="i-Close-Window text-22 text-muted"></i>
                </button>
            </div>
            <input type="text"
                   placeholder="Rechercher"
                   className="search-input"
                   ref={inputRef}
                   value={query}
                   onChange={e => {handleQueryChange(e)}}
            />
            <h5 className="text-muted">{files.length === 0? '' : `${total} filchier(s) trouvé(s)`}</h5>
            <SearchResultList files={files} />

            <h5 className="text-muted">{error && 'Aucun résultat trouvé.'}</h5>
            <h5 className="text-muted">{loading && 'loading...'}</h5>

        </div>

        </>
    )
};

export default Search;