import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Authorization = (WrappedComponent, allowedRoles, auth) => {
    const WithAuthorization = () => {
        if (allowedRoles.includes(auth.user.role)) {
            return <WrappedComponent />
        } else {
            return <Redirect to="/home" />
        }
    };
    return WithAuthorization;
};

// Router configuration
export const Visitor = (component) => (auth) => Authorization(component,['visitor', 'partner', 'admin'], auth);
export const Partner = (component) => (auth) => Authorization(component,['partner', 'admin'], auth);
export const Admin = (component) => (auth) => Authorization(component, ['admin'], auth);

const PrivateRoute = ({ component: ComponentFactory, auth, ...rest }) => {
    const Component = ComponentFactory(auth);
    return (
            <Route
                {...rest}
                render = { props =>
                    auth.isAuthenticated ? <Component {...props} />
                    :
                    <Redirect to={{pathname: "/signin", state: { from: props.location }}} />
                }
            />
        )
};

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);