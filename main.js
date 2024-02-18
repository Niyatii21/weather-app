const apikey = "3fbd5ca5d246804b9a359d6298533cdd";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

async function checkweather(city) {
    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        const data = await response.json();

        // Update the HTML content inside the function
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = `${Math.round(data.main.humidity)}%`;
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weathericon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weathericon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weathericon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weathericon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") { 
            weathericon.src = "images/mist.png";
        }
        document.querySelector(".weather").style.display = "block";
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".error").style.display="block";
    }
}

searchbtn.addEventListener("click", () => {
    checkweather(searchbox.value);
});

// Handle "Enter" key press in the search input
searchbox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        checkweather(searchbox.value);
    }
});
