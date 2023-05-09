const urlParams = new URLSearchParams(window.location.search);
const ubicacion = urlParams.get('ubicacion');
console.log(ubicacion)

let users = [];

fetch('http://127.0.0.1:4000/api/users/all')
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            const destinations = user.manager_name;
            const nameBranch = user.name;
            const time = 0;
            console.log(`Destinations for user ${user.id}: ${destinations}`);
            users.push({destinations, nameBranch, time}); // Agregar los datos al arreglo
            console.log(users);
        });
        users.sort((a, b) => a.time - b.time); // Ordenar los elementos del arreglo de menor a mayor
        console.log(users);
    })
    .catch(error => console.error(error));


// set map options
var mylatlng = { lat:21.15153969516301, lng: -101.71164537558829};
var mapOptions = {
    center: mylatlng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
let map;
function initMap() {
    //create Map
    map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
  }
initMap();

//create a Directions service object to use the route method and get a result for our request
// for our requestx|
var diretionsService = new google.maps.DirectionsService();
//create a DirectionsRenderer object which we will use to display route
var directionsDisplay = new google.maps.DirectionsRenderer();
//bind the diretionsRenderer to the Map
directionsDisplay.setMap(map);

function calcRoute(){
    var request = {
        origin: document.getElementById("from").value,
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