import React from 'react'
import Row from './Row'

function Grid({currentGuess, guesses, turn}) {
  return (
    <div className='grid'>
      {guesses.map((g, i) => {
        if(turn === i){
            return <Row key = {i} currentGuess = {currentGuess}/>
        }
        return <Row key = {i} guess = {g}/>
      })}
    </div>
  )
}

export default Grid
