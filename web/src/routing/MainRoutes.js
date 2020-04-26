import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute, { Admin, Partner, Visitor } from './PrivateRoute';
// import Home from '../containers/Home/Home';
import Wall from '../containers/Wall/Wall';
import Documentation from '../containers/Documentation/Documentation';
import Category from '../containers/Documentation/Category';
import File from '../containers/Documentation/File';
import CreateFile from '../containers/Documentation/CreateFile';
import AddCategory from '../containers/Documentation/AddCategory';
import RecycleBin from '../containers/Documentation/RecycleBin';
import AddUser from '../containers/Settings/AddUser';
import ProfileSettings from '../containers/Settings/ProfileSettings';
import _404 from '../components/_404';

const Routes = () => {
    return (
        <section>
            <Switch>
                {/*<PrivateRoute exact path='/home' component={Visitor(Home)} />*/}
                <PrivateRoute exact path='/home' component={Visitor(Wall)} />
                <PrivateRoute exact path='/pro' component={Partner(Wall)} />
                <PrivateRoute exact path='/documentation' component={Partner(Documentation)} />
                <PrivateRoute exact path='/documentation/categories/:categoryId' component={Partner(Category)} />
                <PrivateRoute exact path='/documentation/categories/:categoryId/files/:fileId' component={Partner(File)} />
                <PrivateRoute exact path='/documentation/create-file' component={Partner(CreateFile)} />
                <PrivateRoute exact path='/documentation/add-category' component={Admin(AddCategory)} />
                <PrivateRoute exact path='/documentation/recycle-bin' component={Admin(RecycleBin)} />
                <PrivateRoute exact path='/settings/add-user' component={Admin(AddUser)} />
                <PrivateRoute exact path='/profile' component={Visitor(ProfileSettings)} />
                <Route component={_404} />
            </Switch>
        </section>
    );
};

export default Routes;
