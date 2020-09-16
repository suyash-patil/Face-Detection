import React from 'react';
import './Rank.css';

const Rank = ({username,entries}) => {
    return (
        <div>
            <div className="white f3 statement">
                {entries<2?`Hello ${username}, your total submitted query is`
                :`Hello ${username}, your total submitted queries are`}
            </div>
            <div className="white f1 entry">
                {entries}
            </div>
        </div>
    )
}

export default Rank;