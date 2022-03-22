import { TOGGLE_SIDEBAR, SET_SIDEBAR, RESET } from './action';

interface SettingState {
    showSidebar: boolean;
}

const initState: SettingState = {
    showSidebar: false,
};

export const setting = (state = initState, action) => {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                showSidebar: !state.showSidebar
            }
        case SET_SIDEBAR:
            return {
                ...state,
                showSidebar: action.payload
            }
        case RESET:
            return initState;
        default:
            return state;
    }
};