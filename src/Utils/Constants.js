const URLS = {
    registerThermostat:'https://api-staging.paritygo.com/sensors/api/thermostat/register/',
    thermostatState: 'https://api-staging.paritygo.com/sensors/api/thermostat/6f6c02ae16a8403383f998c3596ed0d8/'
}

const ThermostatState = {
    off: 'off',
    heat: 'heat',
    cool: 'cool',
    auto_heat: 'auto_heat',
    auto_cool: 'auto_cool',
    auto_standby: 'auto_standby'
}

export {URLS, ThermostatState}