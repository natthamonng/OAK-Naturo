import React from 'react';
import { NavLink } from 'react-router-dom';

const BreadCrumb = (props) => {
    return (
        <div className="breadcrumb">
            <h1>{props.pageName}</h1>
            <ul>
                <li><NavLink to={'/documentation'}>{props.sectionName}</NavLink></li>
                <li>{props.pageName}</li>
                { props.pageDetail &&
                <li>{props.pageDetail}</li>
                }
            </ul>
        </div>
    )
};

export default BreadCrumb;