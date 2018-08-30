import * as types from './constants';

export function changeTitle(payload) {
    return {
        type: types.CHANGE_TITLE,
        payload
    };
}
