import React from 'react'
import './Statistic.css'

export default function Statistic(props) {

    function formattedTime(unit) {
        const minutes = Math.floor(unit / 60)
        const formattedMin = minutes < 10 ? `0${minutes}` : minutes
        const seconds = unit - minutes * 60
        const formattedSec = seconds < 10 ? `0${seconds}` : seconds
        const formattedTime = `${formattedMin} : ${formattedSec}`
        return formattedTime;
    }

    return (
        <div className='statistic'>
        <p className='stats-rolls'>Number of rolls: {props.rolls}</p>
        <p className='stats-time'>
            <span role="img" aria-label="Sandglass">⏳</span>
             Time {formattedTime(props.counter)}
        </p>
        <h3 className='stats-lastTime'>Your last time: {formattedTime(props.lastTime)}</h3>
        </div>
    )
}