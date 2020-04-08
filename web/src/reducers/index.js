import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import alertReducer from './alert.reducer';
import postReducer from './post.reducer';
import visibilityFilterReducer from './visibilityFilter.reducer';

export default combineReducers({
    auth: authReducer,
    alert: alertReducer,
    posts: postReducer,
    visibilityFilter: visibilityFilterReducer
});