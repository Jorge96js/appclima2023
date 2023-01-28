window.addEventListener('load', ()=>{
    let lon
    let lat

    let tempValor = document.getElementById('temp-val')
    let tempDesc = document.getElementById('temp-desc')
    let velViento = document.getElementById('vel-viento')

    let ubicacion = document.getElementById('ubicacion')
    let icono = document.getElementById('icono')
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( posicion =>{

            let lon = posicion.coords.longitude;
            let lat = posicion.coords.latitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=53efd0bac4afba45f442bf68668ec2e9`

            fetch(url)
            .then(res =>  res.json())
            .then(data =>{
                console.log(data)
                let temp = Math.round(data.main.temp)
                let iconCode = data.weather[0].icon
                let urlIcon = `http://openweathermap.org/img/wn/${iconCode}.png`
                icono.src = `http://openweathermap.org/img/wn/${iconCode}.png`;

                let desc = data.weather[0].description
                tempDesc.textContent = desc.toUpperCase()
                tempValor.textContent =  `${temp} C°`
                
                ubicacion.textContent = data.name

                velViento.textContent = `${data.wind.speed} m/s`
                
            })
            .catch(error => console.log(error))
        })
    }
})