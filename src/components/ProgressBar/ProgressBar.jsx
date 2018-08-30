import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './ProgressBar.css';

function ProgressBar({ className, step }) {
    return (
        <div
            className={cn(
                'progress-bar',
                className,
                `progress-bar_${step}`
            )}
        >
            <div className="progress-bar__line" />
        </div>
    );
}

ProgressBar.propTypes = {
    className: PropTypes.string,
    step: PropTypes.number.isRequired
};

export default ProgressBar;
