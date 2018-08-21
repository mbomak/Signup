/* eslint-disable indent */
import * as types from './constants';

const initialState = {
    balance: 0
};

function dataReducer(state = initialState, { type, payload }) {
    switch (type) {
    case types.FETCH_DATA:
        return {
            ...state,
            balance: payload,
        };
    default:
        return state;
    }
}

export default dataReducer;
