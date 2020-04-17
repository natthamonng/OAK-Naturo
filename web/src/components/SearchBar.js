import React from 'react';

const SearchBar = () => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text bg-transparent" id="basic-addon1">
                    <i className="i-Magnifi-Glass1"></i>
                </span>
            </div>
            <input className="form-control" type="text" placeholder="rechercher..."
                   aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
    )
};

export default SearchBar;