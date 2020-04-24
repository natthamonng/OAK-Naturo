import produce from 'immer';
import * as actionsType from '../constants/ActionTypes';

const initialState = {
    categoryList: [],
    loading: false,
    addCategoryLoading: false,
    createFileLoading: false,
    editFileLoading: false,
    notFound: false,
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
            case actionsType.EDIT_FILE_BEGIN:
                draft.editFileLoading = true;
                draft.error = null;
                break;
            case actionsType.GET_CATEGORY_LIST_SUCCESS:
                let categoryList = action.payload.categoryList;
                categoryList.forEach(list => { list.files = [] });
                let ids = new Set(state.categoryList.map(list => list.id));
                let mergedCategoryList = [...draft.categoryList, ...categoryList.filter(list => !ids.has(list.id))];
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
                    // TODO Testing
                    // Object already exists
                    let ids = new Set(state.categoryList[fileListIndex].files.map(list => list.id));
                    draft.categoryList[fileListIndex].files = [
                        ...draft.categoryList[fileListIndex].files,
                        ...files.files.filter(list => !ids.has(list.id))
                    ];
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
                newCategory.files = [];
                let newCategoryList = state.categoryList.concat(newCategory);
                draft.categoryList = newCategoryList.sort((objectA, objectB) => {
                    return objectA.categoryName.localeCompare(objectB.categoryName)
                });
                break;
            case actionsType.CREATE_FILE_SUCCESS:
                let newFile = action.payload.file;
                let targetCategoryIndex = draft.categoryList.findIndex(category => category.id === newFile.category_id);
                if (targetCategoryIndex !== -1) {
                    draft.categoryList[targetCategoryIndex].files.unshift(newFile);
                }
                break;
            case actionsType.EDIT_FILE_SUCCESS:
                draft.editFileLoading =  false;
                // console.log(action.payload.file);
                break;
            case actionsType.ADD_CATEGORY_FAILURE:
                draft.error =  action.payload.error;
                draft.addCategoryLoading =  false;
                break;
            case actionsType.CREATE_FILE_FAILURE:
                draft.error =  action.payload.error;
                draft.createFileLoading =  false;
                break;
            case actionsType.EDIT_FILE_FAILURE:
                draft.error =  action.payload.error;
                draft.editFileLoading =  false;
                break;
            case actionsType.GET_CATEGORY_LIST_FAILURE:
                draft.error =  action.payload.error;
                draft.loading = false;
                draft.categoryList = [];
                break;
            case actionsType.GET_CATEGORY_FILE_LIST_FAILURE:
            case actionsType.GET_FILE_FAILURE:
                // draft.error =  action.payload.error;
                draft.notFound = true;
                draft.loading =  false;
                break;
        }
    })
