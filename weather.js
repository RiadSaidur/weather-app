window.addEventListener('load', () =>{
    let lat;
    let long;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            //getting position
            lat=position.coords.latitude;
            long=position.coords.longitude;
            //setting proxy for live server
            var proxy = "https://cors-anywhere.herokuapp.com/";
            var api = `${proxy}https://api.darksky.net/forecast/8763c747e005243c042e988b881328f6/${lat},${long}`;
            //calling api
            fetch(api)
                .then(response =>{
                    //parsing string to json
                    return response.json();
                })

                .then(data =>{
                    // console.log(data);
                    var location = data.timezone;
                    var temp = data.currently.temperature;
                    temp = (temp - 32)*5/9;
                    temp = Number(temp).toFixed(2);
                    var summary = data.currently.summary;
                    var today = new Date();
                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    //displaying result in window
                    document.querySelector('.location').innerHTML=location;
                    document.querySelector('.temp').innerHTML+=temp;
                    document.querySelector('.time').innerHTML=time;
                    document.querySelector('.summary').innerHTML=summary;
                })
        })
    }
})