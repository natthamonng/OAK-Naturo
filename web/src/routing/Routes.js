import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from '../containers/SignIn/SignIn';
// import SignUp from '../containers/SignUp/SignUp';
import ForgotPWD from '../containers/ForgotPWD/ForgotPWD';
import _404 from '../components/_404';
import PrivateRoute, { Visitor } from './PrivateRoute';
import Layout from "../layout/Layout";
import ResetPWD from '../containers/ResetPWD/ResetPWD';

const Routes = () => {
    return (
        <section>
            <Switch>
                <Route exact path='/signin' component={SignIn} />
                {/*<Route exact path='/signup' component={SignUp} />*/}
                <Route exact path='/reset-password/:token' component={ResetPWD}/>
                <Route exact path='/forgot-password' component={ForgotPWD} />
                <PrivateRoute path='/' component={Visitor(Layout)}/>
                <Route component={_404} />
            </Switch>
        </section>
    );
};

export default Routes;
