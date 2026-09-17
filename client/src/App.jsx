import { useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import SearchForm from "./components/SearchForm";
import WeatherCard from "./components/WeatherCard";
import RecommendationCard from "./components/RecommendationCard";
import AlertCard from "./components/AlertCard";
import ForecastCard from "./components/ForecastCard";
import CropInfoCard from "./components/CropInfoCard";
import StatsCard from "./components/StatsCard";
import Loading from "./components/Loading";

import FertilizerAdvisor from "./pages/FertilizerAdvisor";
import PestDiseaseAdvisor from "./pages/PestDiseaseAdvisor";

import "./App.css";


// ==========================================
// HOME PAGE
// ==========================================

function Home({
    city,
    setCity,
    crop,
    setCrop,
    growthStage,
    setGrowthStage,
    soilType,
    setSoilType,
    farmingActivity,
    setFarmingActivity,
    getWeather,
    getLocationWeather,
    loading,
    weatherData,
    error
}) {

    return (
        <main>

            {/* ==========================================
                HERO SECTION
            ========================================== */}

            <section className="hero">

                <h1>
                    Smart Farming Advisor 🌾
                </h1>

                <p>
                    Make better farming decisions using
                    real-time weather intelligence.
                </p>

            </section>


            {/* ==========================================
                SEARCH FORM
            ========================================== */}

            <SearchForm
                city={city}
                setCity={setCity}

                crop={crop}
                setCrop={setCrop}

                growthStage={growthStage}
                setGrowthStage={setGrowthStage}

                soilType={soilType}
                setSoilType={setSoilType}

                farmingActivity={farmingActivity}
                setFarmingActivity={setFarmingActivity}

                getWeather={getWeather}
                getLocationWeather={getLocationWeather}

                loading={loading}
            />


            {/* ==========================================
                DASHBOARD QUICK SUMMARY
            ========================================== */}

            {!loading && weatherData && (

                <section className="dashboard-summary">

                    {/* Dashboard Header */}

                    <div className="dashboard-summary-header">

                        <div>

                            <span className="dashboard-eyebrow">
                                FARMING DASHBOARD
                            </span>

                            <h2>
                                Farming Conditions for{" "}
                                {weatherData?.weather?.city}
                            </h2>

                            <p>
                                A quick overview of your current
                                weather and crop conditions.
                            </p>

                        </div>


                        {/* Selected Crop */}

                        <div className="dashboard-crop-badge">

                            🌾{" "}
                            {weatherData?.crop?.name || crop}

                        </div>

                    </div>


                    {/* Dashboard Statistics */}

                    <div className="dashboard-summary-grid">


                        {/* Temperature */}

                        <div className="dashboard-stat">

                            <div className="dashboard-stat-icon">
                                🌡️
                            </div>

                            <div>

                                <span>
                                    Temperature
                                </span>

                                <strong>
                                    {weatherData?.weather?.temperature}
                                    °C
                                </strong>

                            </div>

                        </div>


                        {/* Humidity */}

                        <div className="dashboard-stat">

                            <div className="dashboard-stat-icon">
                                💧
                            </div>

                            <div>

                                <span>
                                    Humidity
                                </span>

                                <strong>
                                    {weatherData?.weather?.humidity}%
                                </strong>

                            </div>

                        </div>


                        {/* Wind Speed */}

                        <div className="dashboard-stat">

                            <div className="dashboard-stat-icon">
                                💨
                            </div>

                            <div>

                                <span>
                                    Wind Speed
                                </span>

                                <strong>
                                    {weatherData?.weather?.windSpeed} m/s
                                </strong>

                            </div>

                        </div>


                        {/* Weather Condition */}

                        <div className="dashboard-stat">

                            <div className="dashboard-stat-icon">
                                ☁️
                            </div>

                            <div>

                                <span>
                                    Condition
                                </span>

                                <strong className="dashboard-condition">
                                    {weatherData?.weather?.condition}
                                </strong>

                            </div>

                        </div>

                    </div>

                </section>

            )}


            {/* ==========================================
                LOADING
            ========================================== */}

            {loading && <Loading />}


            {/* ==========================================
                WEATHER RESULTS
            ========================================== */}

            {!loading && weatherData && (

                <>

                    {/* ==========================================
                        CURRENT WEATHER
                    ========================================== */}

                    <WeatherCard
                        weather={weatherData?.weather}
                    />


                    {/* ==========================================
                        WEATHER STATISTICS
                    ========================================== */}

                    <StatsCard
                        weather={weatherData?.weather}
                        forecast={weatherData?.forecast}
                    />


                    {/* ==========================================
                        CROP INFORMATION
                    ========================================== */}

                    <CropInfoCard
                        crop={weatherData?.crop}
                    />


                    {/* ==========================================
                        WEATHER FORECAST
                    ========================================== */}

                    <ForecastCard
                        forecast={weatherData?.forecast}
                    />


                    {/* ==========================================
                        RECOMMENDATIONS
                    ========================================== */}

                    <RecommendationCard
                        recommendations={
                            weatherData?.recommendations
                        }
                    />


                    {/* ==========================================
                        ALERTS
                    ========================================== */}

                    <AlertCard
                        alerts={weatherData?.alerts}
                    />

                </>

            )}


            {/* ==========================================
                ERROR MESSAGE
            ========================================== */}

            {error && (

                <div className="error-message">

                    <span>
                        ⚠️
                    </span>

                    <p>
                        {error}
                    </p>

                </div>

            )}

        </main>
    );
}


// ==========================================
// MAIN APP
// ==========================================

function App() {

    // ==========================================
    // STATE
    // ==========================================

    const [city, setCity] = useState("");

    const [crop, setCrop] = useState("wheat");

    const [weatherData, setWeatherData] = useState(null);

    const [growthStage, setGrowthStage] =
        useState("vegetative");

    const [loading, setLoading] =
        useState(false);

    const [soilType, setSoilType] =
        useState("loamy");

    const [farmingActivity, setFarmingActivity] =
        useState("general");

    const [error, setError] =
        useState("");


    // ==========================================
    // GET WEATHER BY CITY
    // ==========================================

    const getWeather = async () => {

        // Validate city

        if (!city.trim()) {

            setError(
                "Please enter a city name."
            );

            setWeatherData(null);

            return;
        }


        try {

            setLoading(true);

            setError("");


            // API request

            const response = await axios.get(

                `http://localhost:5000/api/weather?city=${encodeURIComponent(
                    city
                )}&crop=${crop}&growthStage=${growthStage}&soilType=${soilType}&farmingActivity=${farmingActivity}`

            );


            // Save API data

            setWeatherData(
                response.data.data
            );

        }


        catch (error) {

            console.error(error);

            setWeatherData(null);


            // Server responded with error

            if (error.response) {

                if (
                    error.response.status === 404
                ) {

                    setError(
                        "City or selected crop was not found. Please check your selection."
                    );

                }

                else if (
                    error.response.status === 400
                ) {

                    setError(
                        "Please provide a valid city and crop."
                    );

                }

                else if (
                    error.response.status === 500
                ) {

                    setError(
                        "Weather service is currently unavailable. Please try again later."
                    );

                }

                else {

                    setError(
                        "Unable to fetch weather data. Please try again."
                    );

                }

            }


            // Request was made but no response

            else if (error.request) {

                setError(
                    "Unable to connect to the server. Please make sure the backend is running."
                );

            }


            // Something else happened

            else {

                setError(
                    "Something went wrong. Please try again."
                );

            }

        }


        finally {

            setLoading(false);

        }

    };


    // ==========================================
    // GET WEATHER BY LOCATION
    // ==========================================

    const getLocationWeather = () => {

        // Check browser support

        if (!navigator.geolocation) {

            setError(
                "Geolocation is not supported by your browser."
            );

            return;
        }


        setLoading(true);

        setError("");


        // Get current location

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                try {

                    const latitude =
                        position.coords.latitude;

                    const longitude =
                        position.coords.longitude;


                    // API request

                    const response =
                        await axios.get(

                            `http://localhost:5000/api/weather?lat=${latitude}&lon=${longitude}&crop=${crop}&growthStage=${growthStage}&soilType=${soilType}&farmingActivity=${farmingActivity}`

                        );


                    // Save weather data

                    setWeatherData(
                        response.data.data
                    );


                    // Update city name

                    setCity(
                        response.data.data.weather.city
                    );

                }


                catch (error) {

                    console.error(error);

                    setError(
                        "Unable to fetch weather for your location."
                    );

                    setWeatherData(null);

                }


                finally {

                    setLoading(false);

                }

            },


            // Location error

            (error) => {

                console.error(error);

                setLoading(false);


                if (error.code === 1) {

                    setError(
                        "Location permission was denied. Please allow location access."
                    );

                }

                else {

                    setError(
                        "Unable to detect your location."
                    );

                }

            }

        );

    };


    // ==========================================
    // ROUTES
    // ==========================================

    return (

        <BrowserRouter>

            {/* Navbar */}

            <Navbar />


            <Routes>

                {/* ==========================================
                    HOME
                ========================================== */}

                <Route
                    path="/"
                    element={

                        <Home

                            city={city}
                            setCity={setCity}

                            crop={crop}
                            setCrop={setCrop}

                            growthStage={growthStage}
                            setGrowthStage={
                                setGrowthStage
                            }

                            soilType={soilType}
                            setSoilType={setSoilType}

                            farmingActivity={
                                farmingActivity
                            }

                            setFarmingActivity={
                                setFarmingActivity
                            }

                            getWeather={
                                getWeather
                            }

                            getLocationWeather={
                                getLocationWeather
                            }

                            loading={loading}

                            weatherData={
                                weatherData
                            }

                            error={error}

                        />

                    }
                />


                {/* ==========================================
                    FERTILIZER ADVISOR
                ========================================== */}

                <Route
                    path="/fertilizer-advisor"
                    element={
                        <FertilizerAdvisor />
                    }
                />


                {/* ==========================================
                    PEST & DISEASE ADVISOR
                ========================================== */}

                <Route
                    path="/pest-disease-advisor"
                    element={
                        <PestDiseaseAdvisor />
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}


// ==========================================
// EXPORT APP
// ==========================================

export default App;