import axios from "axios";
import { AppDispatch } from ".."
import { getCategory, createNewCategory, editCategory, deleteCategory } from "../../apis/apiCategory";

const getListCategory = () => async (dispatch: AppDispatch) => {
    dispatch({
        type: 'SHOW_LOADING'
    });

    const response = await getCategory()

    if (response.status) {
        dispatch({
            type: 'GET_CATEGORY',
            categories: response.data.categories
        })
    }
    dispatch({
        type: 'HIDE_LOADING'
    });
}

const createCategory = (data: any) => async (dispatch: AppDispatch) => {
    dispatch({
        type: 'SHOW_LOADING'
    });
    const response = await createNewCategory(data)
    if (response.status) {
        dispatch({
            type: 'CREATE_CATEGORY',
            category: response.data.createCategory || []
        })
    }
    dispatch({
        type: 'HIDE_LOADING'
    });
}

const editCategory1 = (id: String, data: any) => async (dispatch: AppDispatch) => {
    dispatch({
        type: 'SHOW_LOADING'
    });
    const response = await editCategory(id, data)
    if (response.status) {
        dispatch({
            type: "EDIT_CATEGORY",
            category: response.data.updateCategory || []
        })
    }
    dispatch({
        type: 'HIDE_LOADING'
    });

}

const deleteCategory1 = (id: String) => async (dispatch: AppDispatch) => {
    dispatch({
        type: 'SHOW_LOADING'
    });
    const response = await deleteCategory(id)
    if (response.status) {
        dispatch({
            type: "DELETE_CATEGORY",
            category: response.data.deleteCategory || []
        })
    }
    dispatch({
        type: 'HIDE_LOADING'
    });
}


export {
    getListCategory,
    createCategory,
    editCategory1,
    deleteCategory1
}