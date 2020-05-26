import React, {useState} from 'react';
import BreadCrumb from '../../components/Breadcrumb';
import SpinnerBubble from '../../components/SpinnerBubble';
import UserListTable from '../../components/UserListTable';
import useManageUsers from '../../utils/useManageUsers';
import {Toast} from "react-bootstrap";

const AllUsers = () => {
    const [show, setShow] = useState(true);
    const {
        users,
        loading,
        error,
        isEdited,
        editUserProfile
    } = useManageUsers();

    return (
        <div className="main-content">
                <BreadCrumb mainName={"Paramètre"} mainPath={"#"} pageName={"Liste des utilisateurs"} />

                { isEdited &&
                    <Toast
                        className="bg-primary text-white position-absolute"
                        style={{
                            top: 0,
                            right: 10,
                            zIndex: '1000'
                        }}
                        onClose={() => setShow(!show)} show={show} delay={3000} autohide>
                        <Toast.Header className="bg-primary text-white">
                            <strong className="mr-auto">Notification</strong>
                        </Toast.Header>
                        <Toast.Body>Profil d'utilisateur mis à jour !</Toast.Body>
                    </Toast>
                }

            <div className="separator-breadcrumb border-top"></div>
            <div className="col-12">

                { loading ?
                    <div className="d-flex align-items-center justify-content-center" style={{minHeight: '50vh'}}>
                        <SpinnerBubble/>
                    </div>
                :
                    <UserListTable users={users} editUserProfile={editUserProfile} />
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