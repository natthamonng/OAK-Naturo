import React from 'react';

const SearchBar = () => {
    return (
        <form className="inputForm px-2">
            <div className="form-group d-flex flex-row">
                <input className="form-control form-control-rounded" type="text"
                       name="search"
                       placeholder="Rechercher ..."
                />
                <button className="btn btn-icon btn-rounded btn-primary ml-2">
                    <i className="i-Magnifi-Glass1"></i>
                </button>
            </div>
        </form>
    )
};

export default SearchBar;