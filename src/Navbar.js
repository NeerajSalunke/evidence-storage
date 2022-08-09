import React from 'react';

const Navbar = ({account}) => {
    return (
        <div>
            <nav>
                <p>Evidence Storage System</p>
                <p>{account}</p>
            </nav>
        </div>
    )
}

export default Navbar