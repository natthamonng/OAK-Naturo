import produce from 'immer';
import  * as actionsType from '../constants/ActionTypes';

const initialState = {
    categoryList: [],
    loading: false,
    addCategoryLoading: false,
    createFileLoading: false,
    error: null
};

export default (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case actionsType.GET_CATEGORY_LIST_BEGIN:
                draft.loading = true;
                draft.error = null;
                break;
            case actionsType.GET_CATEGORY_FILE_LIST_BEGIN:
                draft.loading = true;
                draft.error = null;
                break;
            case actionsType.GET_FILE_BEGIN:
                draft.loading = true;
                draft.error = null;
                break;
            case actionsType.ADD_CATEGORY_BEGIN:
                draft.addCategoryLoading = true;
                draft.error = null;
                break;
            case actionsType.CREATE_FILE_BEGIN:
                draft.createFileLoading = true;
                draft.error = null;
                break;
            case actionsType.GET_CATEGORY_LIST_SUCCESS:
                let ids = new Set(state.categoryList.map(list => list.id));
                let mergedCategoryList = [...draft.categoryList, ...action.payload.categoryList.filter(list => !ids.has(list.id))];
                draft.categoryList = mergedCategoryList.sort((objectA, objectB) => {
                    return objectA.categoryName.localeCompare(objectB.categoryName)
                });
                draft.loading = false;
                break;
            case actionsType.GET_CATEGORY_FILE_LIST_SUCCESS:
                let files = action.payload.files;
                let fileListIndex = draft.categoryList.findIndex(list => list.id === files.id);
                if (fileListIndex === -1) {
                    // Object not exists
                    draft.categoryList.push(files);
                } else {
                    // Object already exists
                    draft.categoryList[fileListIndex] = files;
                }
                draft.loading =  false;
                break;
            case actionsType.GET_FILE_SUCCESS:
                let file = action.payload.file;
                let categoryIndex = draft.categoryList.findIndex(category => category.id === file.id);
                if (categoryIndex === -1) {
                    // Object not exists
                    draft.categoryList.push(file);
                } else {
                    // Object already exists
                    let copyCategoriesArray = [...draft.categoryList];
                    let fileIndex = copyCategoriesArray[categoryIndex].files.findIndex(element => element.id === file.files[0].id);
                    if (fileIndex === -1) {
                        // Object not exists
                        copyCategoriesArray[categoryIndex].files.push(file.files[0]);
                    } else {
                        // TODO Fix replace exist content data
                        // Object already exists
                        copyCategoriesArray[categoryIndex].files[fileIndex] = file.files[0];
                    }
                    draft.categoryList = copyCategoriesArray;
                }
                draft.loading =  false;
                break;
            case actionsType.ADD_CATEGORY_SUCCESS:
                draft.addCategoryLoading = false;
                let newCategory = action.payload.category;
                let newCategoryList = state.categoryList.concat(newCategory);
                draft.categoryList = newCategoryList.sort((objectA, objectB) => {
                    return objectA.categoryName.localeCompare(objectB.categoryName)
                });
                break;

            //TODO WIP
            case actionsType.CREATE_FILE_SUCCESS:
                let newFile = action.payload.file;
                draft.documentation.forEach((element, index) => {
                    if (element.id === newFile.category_id) {
                        debugger;
                        //TODO WIP
                        draft.documentation[index].unshift(newFile)
                    }
                });
                break;
            case actionsType.ADD_CATEGORY_FAILURE:
                draft.error =  action.payload.error;
                draft.addCategoryLoading =  false;
                break;
            case actionsType.GET_CATEGORY_LIST_FAILURE:
                draft.error =  action.payload.error;
                draft.loading = false;
                draft.categoryList = [];
                break;
            case actionsType.GET_CATEGORY_FILE_LIST_FAILURE:
            case actionsType.GET_FILE_FAILURE:
                draft.error =  action.payload.error;
                draft.loading =  false;
                break;
        }
    })
