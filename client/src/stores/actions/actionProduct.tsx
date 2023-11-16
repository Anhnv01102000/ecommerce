import axios from "axios";
import { AppDispatch } from ".."
import { getProduct, createNewProduct, editProduct, deleteProduct } from "../../apis/apiProduct";

const getListProduct = () => async (dispatch: AppDispatch) => {
    dispatch({
        type: 'SHOW_LOADING'
    });

    const response = await getProduct()

    if (response.status) {
        dispatch({
            type: 'GET_PRODUCT',
            products: response.data.products
        })
    }
    dispatch({
        type: 'HIDE_LOADING'
    });

}

const createProduct = (data: any) => async (dispatch: AppDispatch) => {
    dispatch({
        type: 'SHOW_LOADING'
    });
    const response = await createNewProduct(data)
    if (response.status) {
        dispatch({
            type: 'CREATE_PRODUCT',
            product: response.data.createProduct || []
        })
    }
    dispatch({
        type: 'HIDE_LOADING'
    });
}

const editProduct1 = (id: String, data: any) => async (dispatch: AppDispatch) => {
    dispatch({
        type: 'SHOW_LOADING'
    });
    const response = await editProduct(id, data)
    if (response.status) {
        dispatch({
            type: "EDIT_PRODUCT",
            product: response.data.updateProduct || []
        })
    }
    dispatch({
        type: 'HIDE_LOADING'
    });

}

const deleteProduct1 = (id: String) => async (dispatch: AppDispatch) => {
    dispatch({
        type: 'SHOW_LOADING'
    });
    const response = await deleteProduct(id)
    if (response.status) {
        dispatch({
            type: "DELETE_PRODUCT",
            product: response.data.deleteProduct || []
        })
    }
    dispatch({
        type: 'HIDE_LOADING'
    });
}


export {
    getListProduct,
    createProduct,
    editProduct1,
    deleteProduct1
}