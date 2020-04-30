import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import FileItem from "./FileItem";

const FileList = ({ files, role }) => {
    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Get current items to show
    const indexOfLastFile = currentPage * itemsPerPage;
    const indexOfFirstFile = indexOfLastFile - itemsPerPage;
    const currentFilesToShow = files.slice(indexOfFirstFile, indexOfLastFile);

    // Change page (called when page number clicked)
    const paginate = pageNumber => setCurrentPage(pageNumber);

    let fileList = currentFilesToShow.map(file => {
        return (
            <div key={file.id}>
                <FileItem
                    file={file}
                    role={role}
                />
            </div>
        )
    });

    if (fileList.length === 0) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center" style={{minHeight: '50vh'}}>
                <h1 className="text-muted">
                    <i className="i-Folder"></i>{' '} Cette catégorie est vide.
                </h1>

                <Link to="/documentation/create-file"
                      className="text-small text-muted font-italic mt-4">
                    <i className="i-File-Edit"></i> <ins>Créer un fichier</ins>
                </Link>
            </div>
        )
    } else {
        return (
            <div className="card text-left">
                <div className="card-body">
                    <h4 className="card-title mb-4">Liste des fichiers: </h4>
                    <div className="list-group">
                        { fileList }
                    </div>
                    <Link to="/documentation/create-file"
                          className="text-small text-muted font-italic float-right mt-4">
                        <i className="i-File-Edit"></i> Créer un fichier
                    </Link>
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
};

export default FileList;