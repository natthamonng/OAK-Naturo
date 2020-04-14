import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute, { Admin, Partner, Visitor } from './PrivateRoute';

import Wall from '../containers/Wall/Wall';
import AddUser from '../containers/Settings/AddUser';
import ProfileSettings from '../containers/Settings/ProfileSettings';
import _404 from '../components/_404';

const Routes = () => {
    return (
        <section>
            <Switch>
                <PrivateRoute exact path='/home' component={Visitor(Wall)} />
                <PrivateRoute exact path='/pro' component={Partner(Wall)} />
                <PrivateRoute exact path='/settings/add-user' component={Admin(AddUser)} />
                <PrivateRoute exact path='/profile' component={Visitor(ProfileSettings)} />
                <Route component={_404} />
            </Switch>
        </section>
    );
}

export default Routes;
