import axios from "axios";
import { AppDispatch } from ".."
import { getUser } from "../../apis/apiUser";

const getListUser = () => async (dispatch: AppDispatch) => {
    dispatch({
        type: 'SHOW_LOADING'
    });

    const response = await getUser()

    if (response.status) {
        dispatch({
            type: 'GET_USER',
            users: response.data.users
        })
    }
    dispatch({
        type: 'HIDE_LOADING'
    });
}


export {
    getListUser,
}