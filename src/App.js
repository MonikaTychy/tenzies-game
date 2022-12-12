import React, { useEffect, useState } from 'react'
import './App.css';
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Statistic from './Statistic'

export default function App() {

  const [dice, setDice] = useState(newDice())
  const [gameOver, setGameOver] = useState(false)
  const [rolls, setRolls] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)

  
  useEffect(() => {
    let time
    if(gameOver === false) {
      time = setInterval(() => {
         setSeconds(seconds + 1)
         if(seconds === 59) {
          setMinutes(minutes + 1)
          setSeconds(0)
         } else {
          clearInterval(time)
         }

         return () => clearInterval(time)

 }, 1000)
    }
  }, [gameOver, seconds, minutes])
  

  useEffect(() => {
     const allHeld = dice.every(die => die.isHeld)
     const firstValue = dice[0].value
     const allTheSameValue = dice.every(die => die.value === firstValue)
  
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
    setRolls(0)
    setMinutes(0)
    setSeconds(0)
  } else {
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ? die : createNewDie()
    }))
    setRolls(rolls + 1)
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
        <Statistic rolls={rolls} seconds={seconds} minutes={minutes} />
      </main>
    </div>
  );
}

