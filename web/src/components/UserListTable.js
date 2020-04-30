import React, { useState } from 'react';
import Moment from 'react-moment';
import Pagination from './Pagination';

const UserListTable = ({ users }) => {
    const [filter, setFilter] = useState('');

    // Filtered items
    const filteredUsers = users.filter(user => (user.username).toLowerCase().includes(filter));
    const filteredEmails = users.filter(user => (user.email).toLowerCase().includes(filter));
    const uniqueSet = new Set([...filteredUsers, ...filteredEmails]);

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Get current items to show
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsersToShow = [...uniqueSet].slice(indexOfFirstUser, indexOfLastUser);

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
                <div className="card-header d-flex align-items-center flex-column flex-md-row">
                    <div className="col-md-8"></div>
                    <div className="form-group mb-0 col-md-4">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="filter-user">
                                    <i className="i-Search-People"></i>
                                </span>
                            </div>
                            <input className="form-control"
                                   type="text" placeholder="rechercher..."
                                   aria-label="filter-user" aria-describedby="filter-user"
                                   value={filter}
                                   onChange={e=> setFilter(e.target.value)}
                            />
                        </div>
                        <small className="ul-form__text form-text" id="passwordHelpBlock">
                            * Avec username ou adresse mail.
                        </small>
                    </div>
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
                { filteredUsers.length > itemsPerPage &&
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        total={filteredUsers.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                }
            </div>
        )
    }
};

export default UserListTable;