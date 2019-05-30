import { API, API_START, API_END, API_ERROR } from "./types";

export const apiStart = label => ({
    type: API_START,
    payload: label
});

export const apiEnd = label => ({
    type: API_END,
    payload: label
});

export const apiError = error => ({
    type: API_ERROR,
    error
});

export function apiAction({
                              url = "",
                              method = "GET",
                              data = null,
                              jwt = false,
                              onSuccess = () => {},
                              onFailure = () => {},
                              label = ""
                          }) {
    alert(111);
    setTimeout(function() { console.log('ssssssss'); }, 5000);
    return {
        type: API,
        payload: {
            url,
            method,
            data,
            jwt,
            onSuccess,
            onFailure,
            label
        }
    };
}