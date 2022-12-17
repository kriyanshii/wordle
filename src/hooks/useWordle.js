import { useState } from "react"

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)])
    const [history, setHistory] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({}) // {a: "green"}
 
    //format a guess into an array of letter objects
    //e.g. [{key}: 'a', color: 'yellow']
    const formatGuess = () => {
        // console.log('formatting the guess - ', currentGuess)
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map((l) => {
            return {key: l, color: 'grey'}
        })
        
        // find any green letters
        formattedGuess.forEach((l, i) => {
            if(solutionArray[i] === l.key){
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }
        })

        //find any yellow color
        formattedGuess.forEach((l, i) => {
            if(solutionArray.includes(l.key) && l.color !== 'green'){
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(l.key)] = null
            }
        })
        return formattedGuess
    }

    //add a new guess to the guesses state
    //update the isCorrect state if the guess is correct
    // add one to the turn state
    const addNewGuess = (formattedGuess) => {
        if(currentGuess === solution){
            setIsCorrect(true)
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn]= formattedGuess
            return newGuesses
        })

        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })

        setTurn((prevTurn) => {
            return prevTurn + 1
        })

        setUsedKeys(prevUsedKeys => {
            formattedGuess.forEach(l => {
              const currentColor = prevUsedKeys[l.key]
      
              if (l.color === 'green') {
                prevUsedKeys[l.key] = 'green'
                return
              }
              if (l.color === 'yellow' && currentColor !== 'green') {
                prevUsedKeys[l.key] = 'yellow'
                return
              }
              if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
                prevUsedKeys[l.key] = 'grey'
                return
              }
            })
      
            return prevUsedKeys
          })

        setCurrentGuess('')
    }
    
    
    //handle keyup event and track current guess
    //if user presses enter, add the new guess
    const handleKeyup = ({ key }) => {
        if(key === 'Enter'){
            // only add guess if turn is less than 5
            if(turn > 5){
                console.log("you used all the guesses")
                return
            }
            // do not allow duplicate words - usehistory
            if(history.includes(currentGuess)){
                console.log('You already tried that word')
                return
            }
            // the length is 5 chars long      
            if(currentGuess.length !== 5){
                console.log('word must be 5 chars long')
                return
            }
            const formatted = formatGuess()
            // console.log(formatted)
            addNewGuess(formatted)
        }
        if(key === 'Backspace'){
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
            return
        }
        if(/^[A-Za-z]$/.test(key)){
            if(currentGuess.length < 5){
                setCurrentGuess((prev) => {
                    return prev + key
                })
            }
        }
    }

    return {turn, currentGuess, guesses, isCorrect, usedKeys,handleKeyup}
}

export default useWordle