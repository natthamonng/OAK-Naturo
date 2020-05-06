import React from 'react';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const BreadCrumb = (props) => {
    return (
        <div className="breadcrumb">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Oak - {props.pageName}</title>
            </Helmet>
            <h1>{props.pageName}</h1>
            <ul>
                <li><NavLink to={`${props.mainPath}`}>{props.mainName}</NavLink></li>
                { props.sectionName ?
                <li><NavLink to={`${props.sectionPath}`}>{props.sectionName}</NavLink></li>
                :
                <li>{props.pageName}</li>
                }
            </ul>
        </div>
    )
};

export default BreadCrumb;