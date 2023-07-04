import { SET_PROFILE } from '../const/index'

const INITIAL_STATE = {
    auth: {}
}

export default function authReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                auth: action.data
            }

        default:
            return state
    }
}