import React, { useEffect, useState } from 'react'

function Keypad() {
    const [letters, setLetters] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3001/letters')
    })
  return (
    <div>
      
    </div>
  )
}

export default Keypad
