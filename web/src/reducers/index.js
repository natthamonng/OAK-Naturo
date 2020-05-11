import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import alertReducer from './alert.reducer';
import postReducer from './post.reducer';
import documentationReducer from './documentation.reducer';
import visibilityFilterReducer from './visibilityFilter.reducer';
import notificationReducer from './notification.reducer';

export default combineReducers({
    auth: authReducer,
    alert: alertReducer,
    posts: postReducer,
    documentation: documentationReducer,
    visibilityFilter: visibilityFilterReducer,
    notification: notificationReducer
});