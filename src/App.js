import React, { useEffect, useState } from 'react'
import './App.css';
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {

  const [dice, setDice] = useState(newDice())
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
     const allHeld = dice.every(die => die.isHeld)
     const firstValue = dice[0].value
     const allTheSameValue = dice.every(die => die.value === firstValue)
    //all the same values and all held setGameOver(true)
    if (allHeld && allTheSameValue) {
      setGameOver(true)
    }
  }, [dice])

  function createNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
  }
  }

  function newDice() {
    const newDice = new Array(10)
    .fill()
   .map(e => e = createNewDie())

    return newDice
}

function rollDice() {
  if (gameOver) {
    setDice(newDice)
    setGameOver(false)
  } else {
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ? die : createNewDie()
    }))
  }
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
      {gameOver && <Confetti />}
      <main>
        <h1 className='title'>Tenzies</h1>
        <p className='instruction'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'>
         {diceElements}
        </div>
        <button onClick={rollDice}>{gameOver ? "New Game" : "Roll"}</button>
      </main>
    </div>
  );
}

