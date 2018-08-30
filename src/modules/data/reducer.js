import * as types from './constants';

const initialState = {
    data: {
        title: 'Signup'
    }
};

function dataReducer(state = initialState, { type, payload }) {
    switch (type) {
    case types.CHANGE_TITLE:
        return {
            ...state,
            title: payload
        };
    default:
        return state;
    }
}

export default dataReducer;
