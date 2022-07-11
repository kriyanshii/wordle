import React, { useEffect, useState } from 'react'

export default function Keypad({ usedKeys }) {
  const [letters, setLetters] = useState(null)

const getData=() => {
  fetch('https://kriyanshishah.github.io/db-json/data/letter.json')
  .then(res => res.json())
  .then(json => {
    setLetters(json)
    console.log(json)
  })
}

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="keypad">
      {letters && letters.map(l => {
        const color = usedKeys[l.key]
        // const color = 'green'

        return (
          <div key={l.key} className={color}>{l.key}</div>
        )
      })}
    </div>
  )
}