import React from 'react';

function UserInfo(props) {
    return (
        <div style={{textAlign: "left" , float: "left"}}>
            <h2>User Info</h2>
            <p>Hello, {props.data.username}</p>
            <p>Credits: {props.data.credits} $</p>

        </div>
    );
}

export default UserInfo;