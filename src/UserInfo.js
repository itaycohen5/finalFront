import React from 'react';

function UserInfo(props) {
    return (
        <div style={{textAlign: "left"}}>
            <h2>User Info</h2>
            <p>Hello, {props.username}</p>
            <p>Credits: {props.credits}</p>

        </div>
    );
}

export default UserInfo;
