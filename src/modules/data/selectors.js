import { createSelector } from 'reselect';
import { getFormMeta } from 'redux-form';

const data = state => state;

const getTitle = createSelector(
    data,
    obj => obj.data.title
);

export default {
    getTitle
};
