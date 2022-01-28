window.addEventListener('load', ()=> {
    let lon;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let weatherThumb = document.querySelector(".imgContainer");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            console.log(position);
          lon = position.coords.longitude;
          lat = position.coords.latitude;
          
          const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=12d1c86af689f6cd057e1588aeb671a1`;

          fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const {temp} = data.main;
                const {description} = data.weather[0];
                const {name} = data;
                const {icon} = data.weather[0];
                // set DOM elements from API
                temperatureDegree.textContent = Math.round(temp-273);
                locationTimezone.textContent = name;
                temperatureDescription.textContent = description;
                weatherThumb.innerHTML = `<img src="./svg/${icon}.svg" alt="icon" class="thumb"></img>`;
            });
        });

    }else{
        locationTimezone.textContent = "It's not working till u allow ur geo";
    };
});

