const name = document.getElementById('name')
const ubicacion = document.getElementById('ubicacion')
const btn = document.getElementById('btn')
var contador = 0;
var matrizInicial = [];


btn.addEventListener('click', () => {
    if (name.value === '' || name.value == null || ubicacion.value === '' || ubicacion.value == null) {
        alert("Inserte todos los datos correctamente");
    }
    else {
        /*fetch('http://127.0.0.1:4000/api/users/all')
            .then(response => response.json())
            .then(data => {
                data.forEach(user => {
                    const destinations = user.manager_name;
                    const nameBranch = user.name
                    console.log(`Destinations for user ${user.id}: ${destinations}`);
                    calcRoute(destinations, nameBranch)
                });
            })
            .catch(error => console.error(error));
*/
        //window.location.href = "ruta";
        const encodedUbicacion = encodeURIComponent(ubicacion.value);
        const encodedName = encodeURIComponent(name.value);
        window.location.href = `ruta?ubicacion=${encodedUbicacion}&name=${encodedName}`;
    }
});

function calcRoute(destino, nameBranch){
    var directionsService = new google.maps.DirectionsService();
    var request = {
        origin: document.getElementById('ubicacion').value,
        destination: destino,
        travelMode: google.maps.TravelMode.DRIVING //WALKING, BYCYCLING AND TRANSIT
    };
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            const output = document.querySelector('#output');
            matrizInicial.push([result.routes[0].legs[0].duration.text, destino, nameBranch])
        } else {
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle-start'></i>Could not retrieve driving distance. </div>";
        }
    });
}




/*
function calcRoute(){
    var request = {
        origin: document.getElementById('ubicacion').value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING AND TRANSIT
        unitSystem: google.maps.UnitSystem.IMPRERIAL
    }
    //Pass the request to the route method
    diretionsService.route(request, (result, status) =>{
        if (status == google.maps.DirectionsStatus.OK){
            //get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + 
            document.getElementById("from").value +
            ". <br />To: " + 
            document.getElementById("to").value +
            ". <br />Driving distance <i class='fas fa-road'></i> :" + 
            result.routes[0].legs[0].distance.text +
            ". <br />Duration <i class='fas fa-hourglass-start'></i> :" + 
            result.routes[0].legs[0].duration.text +
            ".</div>";
            //display route
            directionsDisplay.setDirections(result);
        } else {
            //delete the routes from map
            directionsDisplay.setDirections({routes: []});
            map.setCenter(mylatlng);
            //show error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle-start'></i>Could not retrieve driving distance. </div>";
        }
    });
}

window.calcRoute = calcRoute

//create autocomplete objects for all inputs
var options = {
    types: ["(cities)"],
    fields: ["address_components", "geometry", "icon", "name"],
};
var input_from = document.getElementById("from");
var autocomplete_from = new google.maps.places.Autocomplete(input_from, options);
var input_to = document.getElementById("to");
var autocomplete_from = new google.maps.places.Autocomplete(input_to, options);
*/




var map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/basic-v2/style.json?key=gEwTz8EZKm1Uu0GCcZVM',
    // style:'https://api.maptiler.com/maps/bright-v2/style.json?key=gEwTz8EZKm1Uu0GCcZVM',
    //center: [-0.11,51.49],
    center: [-101.0520189, 20.8609607],
    zoom: 7
});

map.on('load', () => {
    map.addSource('Starts_points', {
        type: 'geojson',
        data: 'http://127.0.0.1:4000/api/users/geousers'
    });
    map.addLayer({
        'id': 'Stars',
        'type': 'symbol',
        'source': 'Starts_points',
        'layout': {
            'icon-image': 'Star_icon',
            'icon-size': 0.05,
        }
    });
    map.loadImage('https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-star-512.png',
        (error, image) => {
            if (error) throw error;
            map.addImage('Star_icon', image);
        });
});
