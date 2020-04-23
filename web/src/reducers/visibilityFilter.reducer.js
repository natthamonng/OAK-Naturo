import { SET_VISIBILITY_FILTER, REINITIALIZE_STATE } from '../constants/ActionTypes';
import { ALL } from '../constants/PostFilters';

const visibilityFilter = (state = ALL, action) => {
    switch (action.type) {
        case REINITIALIZE_STATE:
            return state = ALL;
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state
    }
};

export default visibilityFilter