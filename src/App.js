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
  const [counter, setCounter] = useState(0)
  const [lastTime, setLastTime] = useState(() => JSON.parse(localStorage.getItem("lastTime")) || [])

  useEffect(() => {
      if(gameOver) {
        setLastTime(counter)
        localStorage.setItem("lastTime", JSON.stringify(counter))
      }
  }, [gameOver, counter])
  
  useEffect(() => {
    let timer
    if(gameOver === false) {
      timer = setInterval(() => {
         setCounter(counter + 1)
 }, 1000)
    } else {
      clearInterval(timer)
     }

     return () => clearInterval(timer)
     
  }, [gameOver, counter])

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
    setCounter(0)
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
        <Statistic rolls={rolls} counter={counter} lastTime={lastTime} />
      </main>
    </div>
  );
}

