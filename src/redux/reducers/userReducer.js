
const userState = {
    token: '',
    userInfo:{
        roles: '',
        introduction: '',
        name: '',
        avatar: '',
        message:''
    }
}
const user = (state = userState, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.playload
            }
            break

        case 'DELETE_TOKEN':
            return {
                ...state,
                token: null
            }
            break
        case 'SET_USERINFO':
            return {
                ...state,
                userInfo: action.playload
            }
            break

        default:
            return state
            break
    }
}

export default user;