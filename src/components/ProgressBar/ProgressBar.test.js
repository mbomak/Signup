import React from 'react';
import { shallow } from 'enzyme';

import ProgressBar from './index';

describe('<ProgressBar />', () => {
    it('renders without crashing', () => {
        shallow(<ProgressBar />);
    });
});
