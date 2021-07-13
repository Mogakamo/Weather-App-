import Weather from '../components/Weather'
import React from "react";

const API_KEY = process.env.WEATHER_API_KEY

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            city: undefined,
            country: undefined,
            icon: undefined,
            main: undefined,
            celcius: undefined,
            temp_max: undefined,
            temp_min: undefined,
            temp_celcius: undefined,
            description: "",
            error: false
        }
        this.getWeather()
    }

    calculateCelcius(temp) {
        let celcius = Math.floor(temp - 273.15)
        return celcius;
    }

    getWeather = async () => {
        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=e81887ef6e165833742b414b2565aabe`)

        const response = await api_call.json()

        console.log(response)

        this.setState({
            city: response.name,
            country: response.sys.country,
            celcius: this.calculateCelcius(response.main.temp),
            temp_max: this.calculateCelcius(response.main.temp.max),
            temp_min: this.calculateCelcius(response.main.temp.min),
            description: response.weather[0].description
        })
    }

    render() {
        return (
            <div className="main">
                <Weather
                    city={this.state.city}
                    country={this.state.country}
                    temp_celcius={this.state.celcius}
                    temp_max={this.state.temp_max}
                    temp_min={this.state.temp_min}
                    description={this.state.description}
                />
            </div>
        )
    }
}

export default Home
