import { SET_PROFILE } from '../const/index'

export const setProfile = (data) => {
    return {
        type: SET_PROFILE,
        data
    }
}