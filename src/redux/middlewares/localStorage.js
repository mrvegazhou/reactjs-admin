import { LOGIN, REGISTER, LOGOUT } from "../actions/types";

const localStorageMiddleware = store => next => action => {
    if (action.type === REGISTER || action.type === LOGIN) {
        window.localStorage.setItem("jwt", action.payload.jwt);
    } else if (action.type === LOGOUT) {
        window.localStorage.removeItem("jwt");
    }

    next(action);
};

export default localStorageMiddleware;