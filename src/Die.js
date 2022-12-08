import React from 'react'
import './Die.css'

export default function Die(props) {
    return (
        <div className='die-face'>
            <span className=''>{props.value}</span>
        </div>
    )
}