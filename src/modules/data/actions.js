import * as types from './constants';

export function fetchData(payload) {
    return {
        type: types.FETCH_DATA,
        payload
    };
}
