import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './Button.css';

function Button({
    className,
    title,
    type,
    clickHandle,
    arrow
}) {
    const titleBtn = () => {
        if (arrow) {
            return `${title} &#10132;`;
        }
        return title;
    };
    return (
        <button
            dangerouslySetInnerHTML={{__html: titleBtn()}}
            className={cn('button', className)}
            type={type}
            onClick={clickHandle}
        />
    );
}

Button.defaultProps = {
    type: 'button'
};

Button.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    clickHandle: PropTypes.func,
    arrow: PropTypes.bool,
};

export default Button;
