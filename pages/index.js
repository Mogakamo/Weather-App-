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
        this.weatherIcon = {
            Thunderstorm: "wi-thunderstorm",
            Drizzle: "wi-sleet",
            Rain: "wi-storm-showers",
            Snow: "wi-snow",
            Atmosphere: "wi-fog",
            Clear: "wi-day-sunny",
            Clouds: "wi-day-fog"
        }
    }

    calculateCelcius(temp) {
        let celcius = Math.floor(temp - 273.15)
        return celcius;
    }

    get_WeatherIcon(icons, rangeID) {
        switch (true) {
            case rangeID >= 200 && rangeID<= 232:
                this.setState({icon: this.weatherIcon.Thunderstorm})
                break;
            case rangeID >=300 && rangeID <=321:
                this.setState({icon: this.weatherIcon.Drizzle})
                break;
            case rangeID >= 500 && rangeID <= 531:
                this.setState({icon: this.weatherIcon.Rain})
                break;
            case rangeID >= 600 && rangeID <= 622:
                this.setState({icon: this.weatherIcon.Snow})
                break;
            case rangeID >= 700 && rangeID <= 781:
                this.setState({icon: this.weatherIcon.Atmosphere})
                break;
            case rangeID == 800:
                this.setState({icon: this.weatherIcon.Clear})
                break;
            case rangeID >= 801 && rangeID <= 804:
                this.setState({icon: this.weatherIcon.Clouds})
        }
    }

    getWeather = async () => {
        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=e81887ef6e165833742b414b2565aabe`)

        const response = await api_call.json()

        console.log(response)

        this.setState({
            city: response.name,
            country: response.sys.country,
            celcius: this.calculateCelcius(response.main.temp),
            temp_max: this.calculateCelcius(response.main.temp_max),
            temp_min: this.calculateCelcius(response.main.temp_min),
            description: response.weather[0].description,
            icon: this.weatherIcon.Thunderstorm
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
                    weatherIcon={this.state.icon}
                />
            </div>
        )
    }
}

export default Home
