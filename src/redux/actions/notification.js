import { NOTIFICATION } from "./types.js";

export const notification = (type, title, content) => ({
    type: NOTIFICATION,
    payload: { type, title, content }
});
