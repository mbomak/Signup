import React from 'react';
import { shallow } from 'enzyme';

import Header from './index';

describe('<ProgressBar />', () => {
  it('renders without crashing', () => {
    shallow(<Header />);
  });
});
