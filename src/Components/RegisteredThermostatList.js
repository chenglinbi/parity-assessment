import React from 'react'

const ListOfThermostats = (props) => {
    const onThermostatButtonClick = (event) => {
        //console.log(props.thermostatState)
        props.setCurrentThermostat(event.target.id)
    }

    return (
        <div>
            <h5>Registered Thermostats ({props.thermostatState.length})</h5>
            <div className="btn-group-vertical" role="group" aria-label="Basic example">
                {props.thermostatState.map((data) => {
                    return <button onClick={onThermostatButtonClick} id={data.id} key={data.id} type="button" className="btn btn-outline-primary">{data.id}</button>
                })}
            </div>
        </div>
    )
}

export default ListOfThermostats