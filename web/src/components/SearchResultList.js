import React, {useState} from 'react';
import Pagination from "./Pagination";
import SearchResultItem from "./SearchResultItem";

export default function SearchResultList({files }) {
    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Get current items to show
    const indexOfLastFile = currentPage * itemsPerPage;
    const indexOfFirstFile = indexOfLastFile - itemsPerPage;
    const currentSearchResultToShow = files.slice(indexOfFirstFile, indexOfLastFile);

    // Change page (called when page number clicked)
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const searchResultList = currentSearchResultToShow.map((file) => {
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
        { files.length > itemsPerPage &&
            <Pagination
                itemsPerPage={itemsPerPage}
                total={files.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        }
        </div>
    )
}