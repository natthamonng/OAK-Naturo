import React from 'react';

const Avatar = ({username}) => {
    return (

        <div className="badge badge-round-primary lg m-1" style={{height: '36px', width: '36px'}}>
            {(username).slice(0, 1).toUpperCase()}
        </div>
    )
}

export default Avatar;