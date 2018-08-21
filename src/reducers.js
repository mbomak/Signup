import { combineReducers } from 'redux';

import dataReducer from 'modules/data/reducer';

const rootReducer = combineReducers({
    data: dataReducer
});

export default rootReducer;
