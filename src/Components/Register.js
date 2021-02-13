import React from 'react'

const RegisterThermostat = (props) => {
    
    const onRegisterButtonClick = (event) => {
        event.preventDefault()
        props.registerNewThermostat()
    }

    return (
        <div>
            {
                function () {
                    ('[data-toggle="tooltip"]').tooltip()
                }
            }
            <button onClick={onRegisterButtonClick} type="button" className="btn btn-success" data-toggle="tooltip" data-placement="top" title="Click to register new thermostat">Register</button>
        </div>
    )
}

export default RegisterThermostat