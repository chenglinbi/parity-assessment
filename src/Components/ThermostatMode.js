import React from 'react'
import { ThermostatState } from '../Utils/Constants'

class ThermostatMode extends React.Component {
    onModeButtonClick = (event) => {
        event.preventDefault()
        //console.log(event.target.value)
        
        this.props.onThermostatStateChange(event.target.value)
    }
    setDesiredTemperatueButtonClick = (event) => {
        let desiredTemp = document.getElementById('desiredTemperatureInputBox').value
        if (!isNaN(parseFloat(desiredTemp))) {
            this.props.setDesiredTemperatue(desiredTemp)
            //console.log(props.desiredTemperature)
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row my-2 alert alert-info pb-0">
                    <div className="row">
                        <div className="col">
                            <h5>Thermostat ID: {this.props.thermostatState.id}</h5><br/>
                        
                        </div>
                        <div className="col">
                            <h5>Current Mode: {this.props.thermostatState.currentState}</h5>
                        
                        </div>
                        <div className="col">
                            <h5>Desired Temp: {this.props.thermostatState.desiredTemperature} C</h5>
                        
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h5>Humidity: {this.props.humidityData.latest_value}</h5><br/>
                        
                        </div>
                        <div className="col">
                            <h5>Temperature: {this.props.temperatureData.latest_value}</h5>
                        
                        </div>
                        <div className="col">
                            <h5>Outdoor: {this.props.outdoorData.latest_value}</h5>
                        
                        </div>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col col-md-4">
                        <div className="btn-group-vertical" role="group" aria-label="Basic example">
                            <button disabled={this.props.thermostatState.currentState == null ? true : false} value={ThermostatState.auto_standby} onClick={this.onModeButtonClick} type="button" className="btn btn-outline-primary">Auto</button>
                            <button disabled={this.props.thermostatState.currentState == null ? true : false} value={ThermostatState.cool} onClick={this.onModeButtonClick} type="button" className="btn btn-outline-primary">Cooling</button>
                            <button disabled={this.props.thermostatState.currentState == null || this.props.outdoorData.latest_value < 0 ? true : false} value={ThermostatState.heat} onClick={this.onModeButtonClick} type="button" className="btn btn-outline-primary">Heating</button>
                        </div>
                    </div>
                    <div className="col col-md-6">
                        <div className="input-group mb-3">
                            <input disabled={this.props.thermostatState.currentState == null ? true : false} id="desiredTemperatureInputBox" type="text" className="form-control" placeholder="Set despired temperature" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button disabled={this.props.thermostatState.currentState == null ? true : false} onClick={this.setDesiredTemperatueButtonClick} className="btn btn-outline-secondary" type="button">Set Temp</button>
                            </div>
                        </div>
                    </div>

                    
                </div>
            </div>
        )
    }
    
}

export default ThermostatMode