const apiKey = 'de01c674ad9e285072be08702f1f25a5'
const weatherData = document.querySelector(".weather-data")

const cityName = document.querySelector("#city-name")

const formEle = document.querySelector("form")

const imgICon = document.querySelector(".icon")

formEle.addEventListener("submit",(e)=>{
   // console.log(cityName.value);
   e.preventDefault()

   const cityValue = cityName.value

   getWeatherData(cityValue)
    
    
})

async function getWeatherData(cityValue){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)
        if(!response.ok){
            throw new Error("network response is not okay!!")
        }
       const data = await response.json()
       //console.log(data);

       const temprature = Math.floor( data.main.temp)      
       const description = data.weather[0].description
       const icon = data.weather[0].icon 
       
       const details = [
        `Feels Like: ${Math.floor(data.main.feels_like)}°C`,
        `Humidity: ${data.main.humidity}%`,
        `Wind Speed: ${data.wind.speed} m/s`
       ]
       weatherData.querySelector(".temp").textContent = `${temprature}°C`
       weatherData.querySelector(".desc").textContent = `${description}`
       imgICon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`

       weatherData.querySelector(".details").innerHTML = details.map((detail)=>{
        return `<div>${detail}</div>`

       }).join("")

    }
    catch(err){
       console.log(err);
       weatherData.querySelector(".temp").textContent = ""
       imgICon.innerHTML = ""
       weatherData.querySelector(".desc").textContent = "An error accrued"
       
    }

   
}

