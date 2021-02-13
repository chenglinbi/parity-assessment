import React from 'react'

const PrintState = (props) => {
    
    const printState = (event) => {
        event.preventDefault()
        console.log(props)
    }

    return (
        <div>
            <button onClick={printState} type="button" className="btn btn-success">Print State</button>
        </div>
    )
}

export default PrintState