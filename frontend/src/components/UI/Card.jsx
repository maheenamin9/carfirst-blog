import React from "react";

const Card = props => {
    let classes = `border-1 shadow-3xl rounded-lg ${props.className || ''}`;
    
    return (
        <div className={classes}>
            {props.children}
        </div>
    )
}

export default Card;