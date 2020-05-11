import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Logo from '../assets/images/acorn.png';
import NotificationItem from './NotificationItem';

const NotificationList = () => {
    const notification = useSelector(state => state.notification);
    const [showNotification, setShowNotification] = useState(false);

    const handleHideNotification = () => setShowNotification(false);
    const toggleShowNotification = () => setShowNotification(!showNotification);

    let notificationList;
    if (notification.length > 0) {
        notificationList = notification.map(notif => {
            return (
                <div key={notif.id}>
                    <NotificationItem notif={notif.detail}/>
                </div>
            )
        });
    }

    return (
        <>
            <button className="badge-top-container bg-white border-0"
                    role="button" id="dropdownNotification" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false"
                    disabled={notification.length === 0}
                    style={{outline: 'none'}}
                    onClick={toggleShowNotification}
                    onBlur={handleHideNotification}>
                { notification.length > 0 &&
                    <span className="badge badge-primary">{ notification.length}</span>
                }
                <i className="i-Bell text-muted header-icon"></i>
            </button>

            <div className={`search-ui ${showNotification? 'open' : ''}`}>
                <div className="search-header">
                    <img src={Logo} alt="logo" className="logo"/>
                    <button className="search-close btn btn-icon bg-transparent float-right mt-2"
                            onClick={handleHideNotification}>
                        <i className="i-Close-Window text-22 text-muted"></i>
                    </button>
                </div>

                { notificationList }

            </div>
        </>
    )
};

export default NotificationList;