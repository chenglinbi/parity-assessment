import React from 'react'
import ReactDOM from 'react-dom'
import Axios from 'axios'

import {URLS, ThermostatState} from './Utils/Constants'
import ListOfThermostats from './Components/RegisteredThermostatList'
import ThermostatMode from './Components/ThermostatMode'
import TurnOff from './Components/TurnOff'
import Register from './Components/Register'
import PrintState from './Components/PrintState'
class Thermostat extends React.Component {
    constructor(props) {
        super(props)

        //currentState: ThermostatState.off,
        //desiredTemperature: 0.0,
        //errorMessages: []
        this.state = {
            humidityData: {

            },
            temperatureData: {

            },
            outdoorData: {

            },
            currentThermostat: {
                /* {
                    id: null,
                    currentState: null,
                    desiredTemperature: 0.0
                } */
            },
            thermostatData: [
                /* {
                    id: null,
                    currentState: null,
                    desiredTemperature: 0.0
                } */
            ]
            
        }
    }

    //Life Cycle Methods
    componentDidMount() {
        let localStateData = localStorage.getItem('localData')
        if (localStateData) {
            localStateData = JSON.parse(localStateData)
            this.setState({
                humidityData: localStateData.humidityData,
                temperatureData: localStateData.temperatureData,
                outdoorData: localStateData.outdoorData,
                currentThermostat: localStateData.currentThermostat,
                thermostatData: localStateData.thermostatData
            })
        }
        this.getSensorData()
        //updates sensor data once every 15 seconds
        console.log('Sensor data updated')
        setInterval(() => { 
            this.getSensorData()
        }, 15000)
    }
    componentDidUpdate() {
        console.log('Base app updated')
        localStorage.setItem('localData', JSON.stringify(this.state))
        //console.log(this.state.currentThermostat)
        //enable auto update
        /* if (ThermostatState.auto_standby == this.state.currentThermostat.currentState || ThermostatState.auto_heat == this.state.currentThermostat.currentState || ThermostatState.auto_cool == this.state.currentThermostat.currentState) {
            
            this.enableAutoState()
        } */
    }

    //UI Methods
    enableAutoState() {
        let currentThermostat = {...this.state.currentThermostat}
        if (this.state.currentThermostat.desiredTemperature > this.state.temperatureData.latest_value) {
            
            currentThermostat.currentState = ThermostatState.auto_heat
        }
        else if (this.state.currentThermostat.desiredTemperature < this.state.temperatureData.latest_value) {
            if (this.state.outdoorData.latest_value < 0) {
                currentThermostat.currentState = ThermostatState.auto_standby
            }
            currentThermostat.currentState = ThermostatState.auto_cool   
        }
        this.setState({currentThermostat})
    }

    changeThermostatState = (newState) => {
        
        //checks if currentstate is autostate
        if (ThermostatState.auto_standby == newState || ThermostatState.auto_heat == newState || ThermostatState.auto_cool == newState) {
            this.enableAutoState()
        }
        else {
            //update current state
            let currentThermostat = {...this.state.currentThermostat}
            currentThermostat.currentState = newState
            this.setState({currentThermostat})
        }


        //update thermostat state on server
        this.updateThermostatState(this.state.currentThermostat.id, newState)

    }
    setDesiredTemperatue = (newTemp) => {
        let currentThermostat = {...this.state.currentThermostat}
        currentThermostat.desiredTemperature = newTemp
        

        if (ThermostatState.auto_standby == this.state.currentThermostat.currentState || ThermostatState.auto_heat == this.state.currentThermostat.currentState || ThermostatState.auto_cool == this.state.currentThermostat.currentState) {
            
            this.enableAutoState()
        }

        this.setState({currentThermostat})
    }
    setCurrentThermostat = (key) => {
        let thermostatData = [...this.state.thermostatData]
        let currentThermostat = this.state.currentThermostat
        for (let i = 0; i < thermostatData.length; i++) {
            if (currentThermostat.id == thermostatData[i].id){
                thermostatData.splice(i, 1, currentThermostat)
            }
        }
        this.setState({thermostatData: thermostatData})

        this.state.thermostatData.forEach(thermostat => {
            if (thermostat.id == key){
                //console.log('found '+ thermostat.id)
                this.setState({currentThermostat: thermostat})
            }
        })
        
    }
    //API Methods
    getSensorData = async () => {
        try {
            const response = await Axios.get('http://api-staging.paritygo.com/sensors/api/sensors/', {
                headers: {
                        'Content-Type': 'application/json'
                }
            })
            this.setState({ humidityData: response.data[0] })
            this.setState({ temperatureData: response.data[1] })
            this.setState({ outdoorData: response.data[2] })
            //console.log(response)
        } catch (e) {
            console.log(e)
        }
    }
    updateThermostatState = async (id, newState) => {
        try {
            const response = await Axios.patch('https://api-staging.paritygo.com/sensors/api/thermostat/' + id.toString() + '/' , {
                headers: {
                    'Content-Type': 'application/json'
                },
                data : {
                    state: newState
                }
            })
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }
    registerNewThermostat = async () => {
        let newThermostat = {
            id: '',
            currentState: '',
            desiredTemperature: 0.0
        }
        try {
            const response = await Axios.post('https://api-staging.paritygo.com/sensors/api/thermostat/register/', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            newThermostat.id = response.data.uid_hash
            newThermostat.currentState = response.data.state
            
            this.setState({
                thermostatData: [...this.state.thermostatData, newThermostat]
            })

            //console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    //print state
    
    render() {
        return (
            <div className="container">
                <div className="row my-2">
                    <div className="col align-self-center">
                        <h5>Thermostat App</h5>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <Register registerNewThermostat={this.registerNewThermostat} thermostatState={this.state.currentThermostat}/>
                    </div>
                    <div className="col">
                        {/* <PrintState currentAppState={this.state}/> */}
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col col-md-4">
                        <ListOfThermostats thermostatState={this.state.thermostatData} setCurrentThermostat={this.setCurrentThermostat}/>
                    </div>
                    <div className="col col-md-8">
                        <div className="row">
                            <TurnOff onThermostatStateChange={this.changeThermostatState} thermostatState={this.state.currentThermostat}/>
                        </div>
                        <div className="row">
                            <ThermostatMode setDesiredTemperatue={this.setDesiredTemperatue} onThermostatStateChange={this.changeThermostatState} thermostatState={this.state.currentThermostat} humidityData={this.state.humidityData} temperatureData={this.state.temperatureData} outdoorData={this.state.outdoorData}/>                
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Thermostat />,
    document.getElementById('root')
)