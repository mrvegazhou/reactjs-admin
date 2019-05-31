import {CALENDAR_COUNT_RESET } from '@/redux/actions/types';

const calendarState = {
    showCalendarCount: 1
}

export default (state = calendarState, action) => {
    switch (action.type) {
        case CALENDAR_COUNT_RESET:
            return {
                ...state,
                showCalendarCount: action.payload.showCalendarCount
            }
        default:
            return state;
    }
}