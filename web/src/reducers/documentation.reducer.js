import produce from 'immer';
import * as actionsType from '../constants/ActionTypes';

const initialState = {
    categoryList: [],
    deletedFiles: [],
    deletedCategories: [],
    loading: false,
    addCategoryLoading: false,
    editCategoryLoading: false,
    actionFileLoading: false,
    notFound: false,
    error: null
};

export default (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case actionsType.GET_CATEGORY_LIST_BEGIN:
            case actionsType.GET_CATEGORY_FILE_LIST_BEGIN:
            case actionsType.GET_FILE_BEGIN:
            case actionsType.GET_DELETED_CATEGORIES_BEGIN:
            case actionsType.GET_DELETED_FILES_BEGIN:
                draft.loading = true;
                draft.error = null;
                break;

            case actionsType.ADD_CATEGORY_BEGIN:
                draft.addCategoryLoading = true;
                draft.error = null;
                break;

            case actionsType.EDIT_CATEGORY_NAME_BEGIN:
            case actionsType.REMOVE_CATEGORY_BEGIN:
            case actionsType.RESTORE_CATEGORY_BEGIN:
                draft.editCategoryLoading = true;
                draft.error = null;
                break;

            case actionsType.CREATE_FILE_BEGIN:
            case actionsType.EDIT_FILE_BEGIN:
            case actionsType.REMOVE_FILE_BEGIN:
            case actionsType.RESTORE_FILE_BEGIN:
                draft.actionFileLoading = true;
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
                let newCategory = action.payload.category;
                newCategory.files = [];
                let newCategoryList = state.categoryList.concat(newCategory);
                draft.categoryList = newCategoryList.sort((objectA, objectB) => {
                    return objectA.categoryName.localeCompare(objectB.categoryName)
                });
                draft.addCategoryLoading = false;
                break;

            case actionsType.EDIT_CATEGORY_NAME_SUCCESS:
                let objCategoryIndex = state.categoryList.findIndex((category => category.id === action.payload.id));
                draft.categoryList[objCategoryIndex].categoryName = action.payload.categoryName;
                draft.editCategoryLoading = false;
                break;

            case actionsType.REMOVE_CATEGORY_SUCCESS:
                let removedCategoryId = action.payload.categoryId;
                draft.categoryList = state.categoryList.filter(function(element) {
                    return element.id !== removedCategoryId;
                });
                draft.editCategoryLoading = false;
                break;
            
            case actionsType.GET_DELETED_CATEGORIES_SUCCESS:
                draft.deletedCategories = action.payload.deletedCategories;
                draft.loading = false;
                break;

            case actionsType.RESTORE_CATEGORY_SUCCESS:
                let restoredCategoryId = action.payload.categoryId;
                draft.deletedCategories = state.deletedCategories.filter(function(element) {
                    return element.id !== restoredCategoryId;
                });
                draft.editCategoryLoading = false;
                break;

            case actionsType.CREATE_FILE_SUCCESS:
                let newFile = action.payload.file;
                let targetCategoryIndex = draft.categoryList.findIndex(category => category.id === newFile.category_id);
                if (targetCategoryIndex !== -1) {
                    draft.categoryList[targetCategoryIndex].files.unshift(newFile);
                }
                draft.actionFileLoading = false;
                break;

            case actionsType.EDIT_FILE_SUCCESS:
                draft.actionFileLoading =  false;
                // getFile() works
                break;

            case actionsType.REMOVE_FILE_SUCCESS:
                let removedFileId = action.payload.fileId;
                let objIndex = state.categoryList.findIndex((category => category.id === action.payload.categoryId));
                let copyCategoryArray = [...draft.categoryList];
                copyCategoryArray[objIndex].files = copyCategoryArray[objIndex].files.filter(function(file) {
                    return file.id !== removedFileId
                });
                draft.categoryList = copyCategoryArray;
                draft.actionFileLoading =  false;
                break;

            case actionsType.GET_DELETED_FILES_SUCCESS:
                draft.deletedFiles = action.payload.deletedFiles;
                draft.loading = false;
                break;

            case actionsType.RESTORE_FILE_SUCCESS:
                let restoredFileId = action.payload.fileId;
                draft.deletedFiles = state.deletedFiles.filter(function(element) {
                    return element.id !== restoredFileId;
                });
                draft.actionFileLoading = false;
                break;

            case actionsType.ADD_CATEGORY_FAILURE:
                draft.error =  action.payload.error;
                draft.addCategoryLoading = false;
                break;

            case actionsType.EDIT_CATEGORY_NAME_FAILURE:
            case actionsType.REMOVE_CATEGORY_FAILURE:
            case actionsType.RESTORE_CATEGORY_FAILURE:
                draft.error =  action.payload.error;
                draft.editCategoryLoading =  false;
                break;

            case actionsType.CREATE_FILE_FAILURE:
            case actionsType.EDIT_FILE_FAILURE:
            case actionsType.REMOVE_FILE_FAILURE:
            case actionsType.RESTORE_FILE_FAILURE:
                draft.error =  action.payload.error;
                draft.actionFileLoading =  false;
                break;

            case actionsType.GET_CATEGORY_FILE_LIST_FAILURE:
            case actionsType.GET_FILE_FAILURE:
                draft.error =  action.payload.error;
                draft.notFound = true;
                draft.loading =  false;
                break;

            case actionsType.GET_CATEGORY_LIST_FAILURE:
                draft.error =  action.payload.error;
                draft.loading = false;
                draft.categoryList = [];
                break;
            
            case actionsType.GET_DELETED_CATEGORIES_FAILURE:
                draft.error = action.payload.error;
                draft.deletedCategories = [];
                draft.loading = false;
                break;

            case actionsType.GET_DELETED_FILES_FAILURE:
                draft.error = action.payload.error;
                draft.deletedFiles = [];
                draft.loading = false;
                break;
        }
    })
