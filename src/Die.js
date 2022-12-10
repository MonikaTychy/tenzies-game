import React from 'react'
import './Die.css'

export default function Die(props) {

    const styles = {
       backgroundColor: props.isHeld ? "#ffc0cb" : "#fff"
    }
    const dotAmount = [...Array(props.value)]

    return (
        <div className='die-face' onClick={props.holdDie} style={styles}>
            {dotAmount.map((dot, index) => {
                return <span key={index} className='dot'></span>
            })}
        </div>
    )
}