import { createSelector } from 'reselect';

const data = state => state;

const getTitle = createSelector(
    data,
    obj => obj.data.title
);

export default {
    getTitle
};
