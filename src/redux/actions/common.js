import {
    CURRENT_BREAD_CRUMB_DATA,
    CHANGE_BREAD_CRUMB_DATA,
    UPDATE_ACCESSMENU,
    CHANGE_MENU_COLLAPSED,
    UPDATE_TAB_OPEN_PAGES, UPDATE_TAB_CURRENT_PAGE
} from "@/redux/actions/types";

export function getCurrentBreadCrumbData() {
    return {
        type: CURRENT_BREAD_CRUMB_DATA
    }
}

export function changeBreadCrumbData(currentCrumb) {
    return {
        type: CHANGE_BREAD_CRUMB_DATA,
        payload: {
            currentCrumb: currentCrumb
        }
    }
}

export function changeMenuCollapsed(flag) {
    return {
        type: CHANGE_MENU_COLLAPSED,
        payload: {
            menuCollapsed: flag
        }
    }
}

export function getMenuCollapsed() {
    return {
        type: CHANGE_MENU_COLLAPSED
    }
}

export function updateAccessMenu(data){
    return { type: UPDATE_ACCESSMENU, ...data }
}

//tab标签页
export function updateTabOpenPages(openPages) {
    return {
        type: UPDATE_TAB_OPEN_PAGES,
        payload: {
            openPages: openPages
        }
    };
}

export function updateTabCurrentPage(currentPage) {
    return {
        type: UPDATE_TAB_CURRENT_PAGE,
        payload: {
            currentPage: currentPage
        }
    };
}