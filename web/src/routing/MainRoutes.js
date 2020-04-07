import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute, { Admin, Partner, Visitor } from './PrivateRoute';

import Home from '../containers/Home/Home';
import Wall from '../containers/Wall/Wall';
import AddUser from '../containers/Settings/AddUser';
import _404 from '../components/_404';

const Routes = () => {
    return (
        <section>
            <Switch>
                <PrivateRoute exact path='/home' component={Visitor(Home)} />
                <PrivateRoute exact path='/pro' component={Partner(Wall)} />
                {/*<PrivateRoute path="/wall/:filter" component={Visitor(Wall)} />*/}
                <PrivateRoute exact path='/settings/add-user' component={Admin(AddUser)} />
                <Route component={_404} />
            </Switch>
        </section>
    );
}

export default Routes;
