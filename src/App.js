import React, { useState } from 'react'
import './App.css';
import Die from './Die'
import { nanoid } from 'nanoid'

export default function App() {

  const [dice, setDice] = useState(newDice())

  function newDice() {
    const newDice = new Array(10)
    .fill()
   .map(e => e = {
       value: Math.ceil(Math.random() * 6),
       isHeld: false,
       id: nanoid()
   })

    return newDice
}

function rollDice() {
  setDice(newDice())
}

function holdDie(id) {
  setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld}
      : die
    })
  )
}

const diceElements = dice.map( die => <Die
  value = {die.value}
  key = {die.id}
  id = {die.id}
  isHeld = {die.isHeld}
  holdDie = {() => holdDie(die.id)}
  />)

  return (
    <div className="App">
      <main>
        <h1 className='title'>Tenzies</h1>
        <p className='instruction'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'>
         {diceElements}
        </div>
        <button onClick={rollDice}>Roll</button>
      </main>
    </div>
  );
}

