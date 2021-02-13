import React from 'react'
import {URLS, ThermostatState} from '../Utils/Constants'

const TurnOff = (props) => {
    const onOffButtonClick = (event) => {
        event.preventDefault()
        //console.log('thermostat state from on off button: ' + props.currentState)
        if (props.thermostatState.currentState != ThermostatState.off ) {
            props.onThermostatStateChange(ThermostatState.off)
        } else if (props.thermostatState.currentState == ThermostatState.off) {
            props.onThermostatStateChange(ThermostatState.auto_standby)
        }
    }
    return (
        <div className="container">
            <div className="row align-items-center my-2">
                <div className="col align-self-center">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button disabled={props.thermostatState.currentState == null ? true : false} onClick={onOffButtonClick} type="button" className="btn btn-outline-primary">Turn {props.thermostatState.currentState == ThermostatState.off ? 'on' : 'off'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TurnOff