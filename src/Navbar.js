import React from 'react';

const Navbar = ({account}) => {
    return (
        <div className="center">
            <nav>
                <p style={{margin:"10px 75px 10px", fontSize:"30px"}}><b>Evidence Storage System</b></p>
                <p style={{margin:"10px 75px 10px"}}>{account}</p>
            </nav>
        </div>
    )
}

export default Navbar