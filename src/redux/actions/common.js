import {
    CURRENT_BREAD_CRUMB_DATA,
    CHANGE_BREAD_CRUMB_DATA,
    UPDATE_ACCESSMENU

} from "@/redux/actions/types";

export function getCurrentBreadCrumbData() {
    return {
        type: CURRENT_BREAD_CRUMB_DATA
    }
}

export function changeBreadCrumbData(currentCrumb) {
    return {
        type: CHANGE_BREAD_CRUMB_DATA,
        currentCrumb: currentCrumb
    }
}

export const updateAccessMenu = (data) => {
    return { type: UPDATE_ACCESSMENU, ...data }
}