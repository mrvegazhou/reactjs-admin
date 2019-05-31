import {CALENDAR_COUNT_RESET } from "./types";

export const clickCalendar = (showCalendarCount) => {
    return {
        type: CALENDAR_COUNT_RESET,
        payload: {
            showCalendarCount: showCalendarCount
        }
    };
};