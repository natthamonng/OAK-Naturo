import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {

    return(
        alerts !== null && alerts.length > 0 && alerts.map(alert => (
            <div key={alert.id} className={`alert text-center alert-${alert.alertType}`} role ="alert">
                <strong>{alert.message}</strong>
            </div>
        ))
    );
};

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);