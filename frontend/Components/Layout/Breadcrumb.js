import Link from 'next/link';
import React from 'react';

const Breadcrumb = ({props}) => {
    return (
        <>
            <h1 className="mt-4">{props.title}</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active"><Link href={"/"}>Dashboard</Link></li>
                <li className="breadcrumb-item active">{props.sub_title}</li>
            </ol>
        </>
    );
};

export default Breadcrumb;