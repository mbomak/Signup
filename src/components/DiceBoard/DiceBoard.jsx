import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './DiceBoard.css';

class DiceBoard extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            valueBetAmount: 1
        };
    }

    // write data in local storage when component was reneder
    componentDidUpdate() {
    }

    render() {
        const {
            className,
        } = this.props;

        return (
            <div className={cn('dice-board', className)}>
                2
            </div>
        );
    }
}

DiceBoard.propTypes = {
    className: PropTypes.string
};

export default DiceBoard;
