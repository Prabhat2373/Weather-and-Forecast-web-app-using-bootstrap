// Starting your js here
console.log('Weather app using fetch Api');

// Grab the input element
let cityName = document.getElementById('cityName');
// console.log(cityNameInp.value)

// Grab the weather now button
let weatherBtn = document.getElementById('submitBtn');

// Add Event Listener to WeatherBtn
weatherBtn.addEventListener('click',weatherCity);

// Creating a function which is placed in the EventListener
function weatherCity(){
    if(cityName.value == ""){
        alert('Please Enter City Name to get weather')
    }
    else
    {
    // console.log(cityName.value)
    let apikey = '6b3bf6db669b4be582982724212510';
    let cityValue = cityName.value;
    // url = `http://api.weatherapi.com/v1/current.json?key=${apikey}=${cityName.value}&aqi=yes`
    url = `http://api.weatherapi.com/v1/current.json?key=6b3bf6db669b4be582982724212510&q=${cityValue}&aqi=yes`
    
    // let response = await fetch(url);
    // let res = await response.text();
    // return res;
    fetch(url,{
        method:"GET",
        headers:{'content-type':'application/json'}
    }).then((res)=>{
        return res.json()
    }).then((data)=>{
        // console.log(data)
        // str = ""
        let cityname = data.location.name
        let currentTempC = data.current.temp_c
        let currentTempF = data.current.temp_f
        let currentFeel = data.current.feelslike_c
        let condition = data.current.condition.text
        let country = data.location.country

        let myObj = {
            name:cityName,
            temp:currentTempC,
            tempf:currentTempF,
            condition:condition,
            country:country
        }
        let localStg = localStorage.setItem("Weather",JSON.stringify(myObj));
        // let localStg = localStorage.setItem("Weather",myObj);
        // console.log(localStg)
        // console.log(country)
        let getstg = JSON.parse(localStorage.getItem('Weather'))
        // console.log(getstg.condition)
        let str = `
        <tr>
        <td>${cityname}</td>
        <td>${country}</td>
        <td>${currentTempC}&deg;C/${currentTempF} F</td>
        <td>${getstg.condition}</td>
        <td>${currentFeel}&deg;C</td>
      </tr>
        `
        let tbody = document.getElementById('tbody');
        tbody.innerHTML =str;
    })
}
}
