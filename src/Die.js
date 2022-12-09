import React from 'react'
import './Die.css'

export default function Die(props) {

    const styles = {
       backgroundColor: props.isHeld ? "#ffc0cb" : "#fff"
    }

    return (
        <div className='die-face' onClick={props.holdDie} style={styles}>
            <span className=''>{props.value}</span>
        </div>
    )
}