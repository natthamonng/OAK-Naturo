import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './routes/Routes';
import SignIn from './containers/SignIn/SignIn';

// Redux
import { Provider } from 'react-redux';
import store from './store/store';
import { loadUserByJwt } from './actions/auth.actions';
import { authService } from './services/auth.service';

const App = () => {

    useEffect(() => {
        const token = authService.getToken();
        if (token) {
            store.dispatch(loadUserByJwt(token));
        }
    }, [loadUserByJwt]);

    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path='/' component={SignIn} />
                    <Route component={Routes} />
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;