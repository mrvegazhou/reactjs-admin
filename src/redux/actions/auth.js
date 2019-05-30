import { SIGN_IN, LOGOUT, LOGIN, UPDATE_JWT, ERROR_LOGIN } from "./types";
import { apiAction } from "./api";

export const signIn = (email, password, history, toURL) =>
    apiAction({
        url: "auth/login",
        method: "POST",
        data: { email, password },
        onSuccess: successLogin,
        onFailure: errorLogin,
        label: SIGN_IN,
        history,
        toURL
    });

export const signOut = () => {
    return {
        type: LOGOUT,
        payload: {}
    };
};
export const updateJwt = jwt => {
    return {
        type: UPDATE_JWT,
        payload: jwt
    };
};

const successLogin = data => {
    return {
        type: LOGIN,
        payload: data
    };
};

const errorLogin = error => {
    return {
        type: ERROR_LOGIN,
        payload: error
    };
};
