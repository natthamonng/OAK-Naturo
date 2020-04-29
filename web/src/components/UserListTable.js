import React, { useState } from 'react';
import Moment from 'react-moment';
import Pagination from './Pagination';

const UserListTable = ({ users }) => {
    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Get current items to show
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsersToShow = users.slice(indexOfFirstUser, indexOfLastUser);

    // Change page (called when page number clicked)
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const userList = currentUsersToShow.map((user, index) => {
        return (
            <tr key={`${user.id}-${index}`}>
                <td>{ user.username }</td>
                <td>{ user.email }</td>
                <td>{ user.role }</td>
                <td><Moment format="DD/MM/YYYY">{ user.createdAt }</Moment></td>
            </tr>
        )
    });

    if (users.length === 0) {
        return null;
    } else {
        return (
            <div className="card mb-4">
                <div className="card-header d-flex align-items-center">
                    <h3 className="w-50 float-left card-title m-0">Liste des utilisateurs</h3>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table dataTable-collapse text-center" id="category_table">
                            <thead>
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Adresse mail</th>
                                <th scope="col">Rôle</th>
                                <th scope="col">Créé</th>
                            </tr>
                            </thead>
                            <tbody>

                            { userList }

                            </tbody>
                        </table>
                    </div>
                </div>
                { users.length > itemsPerPage &&
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        total={users.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                }
            </div>
        )
    }
};

export default UserListTable;