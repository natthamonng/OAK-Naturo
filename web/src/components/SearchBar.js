import React from 'react';

const SearchBar = () => {
    return (
        <div className="input-group mb-3">
            <input className="form-control" type="text" placeholder="rechercher..." aria-label="Recipient's username"
                   aria-describedby="basic-addon2"/>
            <div className="input-group-append">
                <span className="input-group-text bg-transparent" id="basic-addon2">
                    <i className="i-Magnifi-Glass1"></i>
                </span>
            </div>
        </div>
    )
};

export default SearchBar;