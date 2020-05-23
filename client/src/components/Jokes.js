import React, { useState, useEffect } from 'react';

import { axiosWithAuth } from '../utils/axiosWithAuth.js';
import JokeCard from './JokeCard.js';

const Jokes = props =>{

    const [jokes, setJokes] = useState([])

    useEffect(()=>{
        axiosWithAuth()
        .get("/jokes")
        .then(async jokes=>{
            setJokes(jokes.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }, [])

    console.log(jokes)

    const makeJokes=()=>{
       return jokes.map(joke => <JokeCard id={joke.id} joke={joke.joke} key={joke.id}/>)
    }





    return(
        <div>
            <h1>JOKES</h1>
            {makeJokes()}
        </div>
    )

}

export default Jokes

