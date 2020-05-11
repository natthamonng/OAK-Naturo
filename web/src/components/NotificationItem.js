import React from 'react';
import Moment from 'moment';

const NotificationItem = ({ notif }) => {

    return (
        <div className="ul-widget-app__row-comments border-bottom-gray-200 mb-0">
            <div className="ul-widget-app__comment w-100">
                <div className="ul-widget-app__profile-title">
                    <h6 className="heading">{notif.message}</h6>
                </div>
                {/*<div className="ul-widget-app__profile-status">*/}
                {/*    <small className="text-mute">*/}
                {/*        <span className="font-weight-bold">{"date"}</span>*/}
                {/*    </small>*/}
                {/*</div>*/}
            </div>
        </div>
    )
};

export default NotificationItem;