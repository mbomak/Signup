import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './Header.css';

function Header({ className, title }) {
    return (
        <header className={cn('header', className)}>
            <h1>{title}</h1>
        </header>
    );
}

Header.defaultProps = {
    title: 'Signup'
};

Header.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string
};

export default Header;
