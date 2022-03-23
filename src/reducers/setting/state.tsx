import { TOGGLE_SIDEBAR, SET_SIDEBAR, RESET, PAUSE, REFRESH_PAUSE } from './action';

interface SettingState {
    showSidebar: boolean;
    pauseUntil: number;
}

const initState: SettingState = {
    showSidebar: false,
    pauseUntil: 0
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
        case PAUSE:
            let current_pause = state.pauseUntil;
            let current = Date.now();

            if (!current_pause || current_pause < current) {
                current_pause = current;
            }
            current_pause += action.payload * 60 * 1000;

            return {
                ...state,
                pauseUntil: current_pause
            }
        case REFRESH_PAUSE:
            return {
                ...state,
                pauseUntil: Date.now()
            }
        case RESET:
            return initState;
        default:
            return state;
    }
};