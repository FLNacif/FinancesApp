import React from "react";
import './Card.css';

function Card({ children, style, className='' }){
    return(
        <div style={style} className={className+" card"}>
            {children}
        </div>
    );
}

export default Card;