import React from 'react';
import SearchResultItem from './SearchResultItem';

export default function SearchResultList({files }) {

    const searchResultList = files.map((file) => {
        return (
            <div key={file.id}>
                <SearchResultItem file={file}/>
            </div>
        )
    });

    return (
        <div >
            <div className="search-results list-horizontal mb-4">
                {searchResultList}
            </div>
        </div>
    )
}