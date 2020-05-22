import React from 'react';

const JokeCard = props =>{

    return(
        <div className="joke-card">
            <h4 className="joke">{props.joke}</h4>
            <p>ID: {props.id}</p>
        </div>
    )
}

export default JokeCard