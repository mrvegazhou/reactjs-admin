import { ERROR_LOGIN, NOTIFICATION } from "@/actions/types";
import { error } from "react-toastify-redux";
import { notification } from "antd";

const noticeMiddleware = ({ dispatch }) => next => action => {
    switch (action.type) {
        case ERROR_LOGIN:
            dispatch(error(action.payload.response));
            break;
        case NOTIFICATION:
            notification[action.payload.type]({
                message: action.payload.title,
                description: action.payload.content,
                style: {
                    width: 600,
                    marginLeft: 335 - 600
                }
            });
            next(action);
            break;
        default:
            next(action);
            break;
    }
};

export default noticeMiddleware;