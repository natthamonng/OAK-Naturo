import React from 'react';
import BreadCrumb from '../../components/Breadcrumb';
import Spinner from '../../components/Spinner';
import UserListTable from '../../components/UserListTable';
import useGetUsers from '../../utils/useGetUsers';

const AllUsers = () => {

    const {
        users,
        loading,
        error
    } = useGetUsers();

    return (
        <div className="main-content">
            <BreadCrumb mainName={"Paramètre"} mainPath={"#"} pageName={"Liste des utilisateurs"} />
            <div className="separator-breadcrumb border-top"></div>
            <div className="col-12">
                { loading ?
                    <div className="d-flex align-items-center justify-content-center" style={{minHeight: '50vh'}}>
                        <Spinner/>
                    </div>
                :
                    <UserListTable users={users}/>
                }
                { error &&
                    <div className="d-flex align-items-center justify-content-center" style={{minHeight: '50vh'}}>
                        <h1 className="text-mute">
                            Une erreur s'est produite, veuillez réessayer plus tard.
                        </h1>
                    </div>
                }
            </div>
        </div>
    )
};

export default AllUsers;