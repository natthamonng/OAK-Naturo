import React from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
    const alerts = useSelector(state => state.alert);
    return(
        alerts !== null && alerts.length > 0 && alerts.map(alert => (
            <div key={alert.id} className={`alert text-center alert-${alert.alertType}`} role ="alert">
                <strong>{alert.message}</strong>
            </div>
        ))
    );
};

export default Alert;