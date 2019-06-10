import {
    CHANGE_BREAD_CRUMB_DATA,
    CURRENT_BREAD_CRUMB_DATA,
    UPDATE_ACCESSMENU
} from "@/redux/actions/types";

const globalState = {
    currentCrumb: null,
    openAccessMenu: []
}

export function handleBreadCrumb(state = globalState, action) {
    switch (action.type) {
        case 'CHANGE_BREAD_CRUMB_DATA':
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

