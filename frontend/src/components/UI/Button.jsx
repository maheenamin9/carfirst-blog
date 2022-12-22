import React from "react";

const Button = props => {
    let classes = `bg-yellow-400 border-4 border-yellow-400 font-bold hover:bg-white duration-300 p-2 ${props.className || ''}`;
    
    return(
        <button 
            className={classes}
            type={props.type || 'button'}
            onClick={props.onClick}
            >
            {props.children}
        </button>
    )
}

export default Button;