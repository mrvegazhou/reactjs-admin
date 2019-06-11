import {
    CHANGE_BREAD_CRUMB_DATA,
    CURRENT_BREAD_CRUMB_DATA,
    UPDATE_ACCESSMENU,
    CHANGE_MENU_COLLAPSED,
    UPDATE_TAB_OPEN_PAGES,
    UPDATE_TAB_CURRENT_PAGE
} from "@/redux/actions/types";

const globalState = {
    currentCrumb: null,
    openAccessMenu: []
}

export function handleBreadCrumb(state = globalState, action) {
    switch (action.type) {
        case CHANGE_BREAD_CRUMB_DATA:
            localStorage.setItem("currentCrumb", JSON.stringify(action.payload.currentCrumb));
            return Object.assign({}, state, {
                currentCrumb: action.payload.currentCrumb
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

export function handleMenuCollapsed(state, action) {
    if (!state) {
        state = {
            menuCollapsed: false
        }
    }
    switch (action.type) {
        case CHANGE_MENU_COLLAPSED:
            return {
                ...state,
                menuCollapsed: action.payload.menuCollapsed
            };
        default:
            return state;
    }
}

export function handleAccessMenu(state, action) {
    if (!state) {
        state = {
            openAccessMenu: [] //展开的可访问的菜单(子级包含父级name)
        }
    }
    switch (action.type) {
        case UPDATE_ACCESSMENU:
            return {
                ...state,
                openAccessMenu: action.openAccessMenu,
            }
        default:
            return state;
    }
}

//tab标签
export function handleTabOpenPages(state, action) {
    if (!state) {
        state = {
            openPages: [],
            currentPage: ''
        }
    }
    switch (action.type) {
        case UPDATE_TAB_OPEN_PAGES:
            return {
                ...state,
                openPages: action.payload.openPages
            }
        case UPDATE_TAB_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload.currentPage
            }
        default:
            return state;
    }
}

