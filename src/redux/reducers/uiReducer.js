import user from "@/redux/reducers/userReducer";

const UIState = {
    collapsed: false,
    isMobile: false
}

const UI = (state = UIState, action) => {
    switch (action.type) {
        case 'CHANGE_ISMOBILE':
            return {
                ...state,
                isMobile: action.playload
            }
            break

        case 'CHANGE_COLLAPSED':
            return {
                ...state,
                collapsed: action.playload
            }
            break

        default:
            return state
            break
    }
}

export default UI;