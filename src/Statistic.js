import React from 'react'
import './Statistic.css'

export default function Statistic(props) {
    return (
        <div className='statistic'>
        <p className='stats-rolls'>Number of rolls: {props.rolls}</p>
        <p className='stats-time'>
            <span role="img" aria-label="Sandglass">⏳</span>
             Time {props.minutes < 10 ? "0" + props.minutes : props.minutes}
             :
             {props.seconds < 10 ? "0" + props.seconds : props.seconds}
        </p>
        <h3 className='stats-bestTime'>Your best time: 0:0</h3>
        </div>
    )
}