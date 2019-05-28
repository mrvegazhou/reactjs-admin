import {CHANGE_BREAD_CRUMB_DATA, CURRENT_BREAD_CRUMB_DATA} from "@/redux/actions/common";

const globalState = {
    currentCrumb: null
}

export function handleBreadCrumb(state = globalState, action) {
    switch (action.type) {
        case CHANGE_BREAD_CRUMB_DATA:
            console.log(action.currentCrumb, "action.currentCrumb");
            localStorage.setItem("currentCrumb", JSON.stringify(action.currentCrumb));

            return Object.assign({}, state, {
                currentCrumb: action.currentCrumb
            });

        case CURRENT_BREAD_CRUMB_DATA:
            let obj = localStorage.getItem("currentCrumb");

            try {
                obj = (obj && JSON.parse(obj))
            } catch (e) {
                console.log(e);
                obj = null;
            }

            return Object.assign({}, state, {
                currentCrumb: obj
            });

        default:
            return state;
    }
}