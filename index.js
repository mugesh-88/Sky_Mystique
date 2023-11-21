const apikey= "c9d7eb74cdcbbe4d867c8319c1996afe";
const weatherDataElement = document.getElementById("weather-data");
const cityInputElement = document.getElementById("city-input");
const formElement= document.querySelector("form");
const exclude="daily";
formElement.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityValue = cityInputElement.value;
    console.log(cityValue);
    getWeatherData(cityValue);
});
async function getWeatherData(cityValue){
    console.log(cityValue);
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);
        if(!response.ok){
            throw new Error("Network Response Was Not Ok");
        }
        const data = await response.json();
        console.log(data);
        const temperatureData = Math.round(data.main.temp);
        const descriptionData = data.weather[0].description;
        const iconData=data.weather[0].icon;
        const detailsData =[
             `Feels-like:${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity} %`,
            `wind speed: ${data.wind.speed} m/s`
        ]
        
        const iconUrl = `http://openweathermap.org/img/wn/${iconData}.png`;
        weatherDataElement.querySelector(".icon").innerHTML=`<img src="${iconUrl}" alt="Wheater Icon">`;
        weatherDataElement.querySelector(".temperature").textContent=`${temperatureData}°C`;
        weatherDataElement.querySelector(".description").textContent=`${descriptionData}!`;
        weatherDataElement.querySelector(".details").innerHTML = detailsData.map((detail)=> `<div>${detail}</div>`).join("");
    }
    catch(error){
        weatherDataElement.querySelector(".icon").innerHTML="";
        weatherDataElement.querySelector(".temperature").textContent="";
        weatherDataElement.querySelector(".description").textContent="An Error Occured, Please Try Again Later";
        weatherDataElement.querySelector(".details").innerHTML = "";
    }
}