import React from 'react';
import { NavLink } from 'react-router-dom';

const BreadCrumb = (props) => {
    return (
        <>
        <div className="breadcrumb">
            <NavLink to="/documentation">
                <h1>{props.sectionName}</h1>
            </NavLink>
            <ul>
                <li>Oak-Naturo</li>
                <li>{props.pageName}</li>
                { props.pageDetail &&
                <li>{props.pageDetail}</li>
                }
            </ul>
        </div>
        </>
    )
};

export default BreadCrumb;