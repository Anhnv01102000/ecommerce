import axios from "axios";
import { AppDispatch } from ".."
import { createNewOrder, getOrder } from "../../apis/apiOrder";

const getListOrder = () => async (dispatch: AppDispatch) => {
    dispatch({
        type: 'SHOW_LOADING'
    });
    const response = await getOrder()
    if (response.status) {
        dispatch({
            type: 'GET_ORDER',
            orders: response.data.orders
        })
    }
    dispatch({
        type: 'HIDE_LOADING'
    });
}

export {
    getListOrder,
}