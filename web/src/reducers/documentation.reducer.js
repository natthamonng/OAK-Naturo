import produce from 'immer';
import  * as actionsType from '../constants/ActionTypes';

const initialState = {
    categories: [],
    loading: false,
    addCategoryLoading: false,
    error: null
};

export default (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case actionsType.DOCUMENTS_LOADING:
                draft.loading = true;
                draft.error = null;
                break;
            case actionsType.ADD_CATEGORY_BEGIN:
                draft.addCategoryLoading = true;
                draft.error = null;
                break;
            case actionsType.GET_DOCUMENTS_SUCCESS:
                draft.categories = action.payload.categories;
                draft.loading =  false;
                break;
            case actionsType.ADD_CATEGORY_SUCCESS:
                draft.addCategoryLoading = false;
                let newCategory = action.payload.category;
                draft.categories = [
                    ...state.categories,
                    newCategory
                ];
                break;
            case actionsType.ADD_CATEGORY_FAILURE:
                draft.error =  action.payload.error;
                draft.addPostLoading =  false;
                break;
            case actionsType.GET_DOCUMENTS_FAILURE:
                draft.error =  action.payload.error;
                draft.addCategoryLoading = false;
                draft.categories = [];
                break;
        }
    })