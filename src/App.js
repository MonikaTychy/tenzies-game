import './App.css';
import Die from './Die'

export default function App() {
  return (
    <div className="App">
      <main>
        <h1 className='title'>Tenzies</h1>
        <p className='instruction'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'>
          <Die value='1' />
          <Die value='2' />
          <Die value='3' />
          <Die value='4' />
          <Die value='5' />
          <Die value='6' />
          <Die value='1' />
          <Die value='2' />
          <Die value='3' />
          <Die value='4' />
        </div>
        <button>Roll</button>
      </main>
    </div>
  );
}

