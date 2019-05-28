import {
    GET_LIST,
    ALL_LIST,
    ADD_LIST,
    EDIT_LIST,
    UPDATE_LIST
} from "@/redux/actions/types";

const INITIAL_STATE = {
    isLoading: false,
    isCreating: false,
    isUpdating: false,
    data: [],
    error: null,
    created: null,
    createErrors: [],
    view: {
        error: null,
        current: null,
        loading: false
    },
    edit: {
        data: null,
        error: null,
        loading: false
    },
    remove: {
        status: null,
        current: null,
        loading: false
    },
    updated: null,
    updateErrors: [],
    filters: {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ALL_LIST:
            return {
                ...state,
                data: action.payload.response
            };
        default:
            return state;
    }
}