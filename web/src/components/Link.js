import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ active, children, onClick }) => {
    return (
        <button className="btn btn-raised ripple btn-raised-secondary m-1 ml-2"
                onClick={onClick}
                disabled={active}
        >
            {children}
        </button>
    )
};

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    // PropTypes.node === Anything that can be rendered: numbers, strings, elements or an array
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Link