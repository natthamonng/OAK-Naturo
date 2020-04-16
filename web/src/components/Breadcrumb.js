import React from 'react';

const BreadCrumb = (props) => {
    return (
        <>
        <div className="breadcrumb">
            <h1>{props.sectionName}</h1>
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