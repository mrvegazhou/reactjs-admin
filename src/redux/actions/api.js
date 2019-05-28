import {
    API
} from "@/redux/actions/types";

export function apiAction({
                              url = "",
                              method = "GET",
                              data = null,
                              jwt = false,
                              onSuccess = () => {},
                              onFailure = () => {},
                              label = ""
                          }) {
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