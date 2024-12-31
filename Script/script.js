const apiKey = '24ac3dfe7667fd35d3462348e600a37f';
const weatherInfo = document.getElementById('weather-info'); 
const searchBtn = document.getElementById('search_btn');
const cityInput = document.getElementById('city');

//Buscar el clima al hacer click
searchBtn.addEventListener('click', fetchWeather);

//Funcion para obtener datos sobre el clima
async function fetchWeather() {
    const city = cityInput.value.trim();
    if(!city){
        weatherInfo.innerHTML = '<p>Por favor, ingresa una ciudad</p>';
        return; 
    }

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`);
        if(!response.ok) throw new Error('Ciudad no encontrada');

        const data = await response.json();
        displayWeather(data);
    }catch(err){
        weatherInfo.innerHTML = `<p>${err.message}</p>`;
    }
}

//Funcion para mostrar los datos del clima
function displayWeather(data){
    const {name, main, weather, wind} = data;
    const {temp, humidity} = main;
    const description = weather[0].description;
    const descriptionM = description[0].toUpperCase()+description.substring(1);
    const windSpeed = wind.speed;
    const iconCode = weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherInfo.innerHTML = `
        <p><strong>Ciudad: </strong> ${name} </p> 
        <p><strong>Temperatura: </strong> ${temp}°C </p>   
        <p><strong>Descripción: </strong> ${descriptionM} </p>  
        <p><strong>Humedad: </strong> ${humidity} </p>   
        <p><strong>Viento: </strong> ${windSpeed} </p>
        <img src="${iconUrl}" alt="Icono de clima">
    `;
}