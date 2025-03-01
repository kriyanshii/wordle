import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Wordle from './components/Wordle'

function App() {
  const[solution, setSolution] = useState(null)

  const getData=() => {
    fetch('https://kriyanshii.github.io/db-json/data/solutions.json')
    .then(res => res.json())
    .then(json =>{
      // randome int between 0 to 20
      const randomSolution = json[Math.floor(Math.random() * json.length)]
      setSolution(randomSolution.word)
    })
  }

  useEffect(() => {
    getData()
  }, [setSolution])
  
  return (
    <div className="App">
        <div className="heading"> 
        {/*       <div><a className="click-btn btn-style500" href="#">Hover me</a></div> */}
        <i className="word effect-2 sub-b">W</i>
          <i className="word yellow effect-2 sub-b">O</i>
          <i className="word effect-2 sub-b">R</i>
          <i className="word grey effect-2 sub-b">D</i>
          <i className="word effect-2 sub-b">L</i>
          <i className="word effect-2 sub-b">E</i>
        </div>
      {solution && <Wordle solution = {solution}/>}
    </div>
  );
}

export default App

/* 

data we need to track:
  -- solution
    -- 5 letter string, e.g. 'drain'
  -- past guesses
    -- an array of past guesses
    -- each past guess is an array of letter objects [{}, {}, {}, {}, {}]
    -- each object represents a letter in the guess word {letter: 'a', color: 'yellow'}
  -- current guess
    -- string 'hello'
  -- keypad letters
    -- array of letter objects [{key: 'a', color: 'green'}, {}, {} ...]
  -- number of turns
    -- an integer 0 - 6

game process:
  -- entering words:
    -- user enters a letter & a square is filled with that letter
    -- when a user hits delete it deletes the previous letter
    -- when a user hits enter it submits the word
      -- if all squares are not filled with letters then the word is not submitted
      -- if that word has already been used in a prev guess then the word is not submitted
  -- checking submitted words:
    -- each letter is checked to see if it matches to the solution
    -- each letter is assigned a color based on it's inclusion in the solution
      -- exact matches (correct position in the solution) are green
      -- partial matches (in the solution but not the correct position) are yellow
      -- none-matches (not in the solution at all) are grey
    -- the guess is added the grid with the correct colors
    -- the current guess moves to the next row
    -- the keypad letters are updated (colors)
  -- ending the game:
    -- when the guessed word fully matches the solution
      -- modal to say 'well done'
    -- when the user runs out of guesses
      -- modal to say 'unlucky'

      Future Updates-
      -- add modal - inspo - https://reactle.vercel.app/ -- https://github.com/cwackerfuss/react-wordle/tree/main/src/components
      -- add dark and light theme using react in the existing project

*/