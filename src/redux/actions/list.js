import {
    GET_LIST,
    ALL_LIST,
    ADD_LIST,
    EDIT_LIST,
    UPDATE_LIS,
    ERROR_ALL_LISTT
} from "@/redux/actions/types";
import { apiAction } from "./api";
import { notification } from "./notification";

export const getList = ({ pagination, filters, sorter = null }) => (
    dispatch,
    getState
) => {
    let data = { page: pagination.current, limit: pagination.pageSize };

    if (sorter) {
        data.sorter = sorter;
    }

    if (filters) {
        data = { ...data, ...filters };
    }

    dispatch(
        apiAction({
            url: "/list",
            method: "GET",
            jwt: true,
            data,
            onSuccess: data => {
                return { type: ALL_LIST, payload: data };
            },
            onFailure: err => (dispatch, getState) => {
                dispatch({ type: ERROR_ALL_LIST, payload: err });
                dispatch(notification("warning", "Not found products", err.response));
            },
            label: GET_LIST
        })
    );
};
