const urlParams = new URLSearchParams(window.location.search);
const ubicacion = urlParams.get('ubicacion');
const name = urlParams.get('name');
console.log(ubicacion)
const userList = document.getElementById('users-list');
//var numConsult = 0;
//var time = 0;
//var destino = ""
//var nameBranch = ""

let users = [];

async function verMejorRuta(){
    const nameUserElement = document.getElementById("nameUser");
    
    nameUserElement.textContent = name + " tu sucursal mas sercana es:";
    
    fetch('http://127.0.0.1:4000/api/users/all')
    .then(response => response.json())
    .then(data => {
        var numConsult2 = 0
        data.forEach(async user => {
            var time = 0
            var destino = ""
            var nameBranch = ""
            destino = user.manager_name;
            nameBranch = user.name;
            numConsult2++;
            //console.log(`Destinations for user ${user.id}: ${destino}`);
            await calcRoute(time, destino, nameBranch, numConsult2);
            
            //users.push({destino, nameBranch, time}); // Agregar los datos al arreglo
        });
        //users.sort((a, b) => a.time - b.time); // Ordenar los elementos del arreglo de menor a mayor
        //console.log(users);
    })
    .catch(error => console.error(error));
}


function ordenar(usersSend){
    for (let i = 0; i < usersSend.length - 1; i++) {
      for (let j = 0; j < usersSend.length - i - 1; j++) {
        let tiempoActual = tiempoAMinutos(usersSend[j].time);
        let tiempoSiguiente = tiempoAMinutos(usersSend[j + 1].time);
    
        if (tiempoActual > tiempoSiguiente) {
          let temp = usersSend[j];
          usersSend[j] = usersSend[j + 1];
          usersSend[j + 1] = temp;
        }
      }
    }
    
    // Función para convertir el tiempo a minutos
    function tiempoAMinutos(tiempo) {
      let tiempoArray = tiempo.split(' ');
    
      let horas = 0;
      let minutos = 0;
    
      for (let i = 0; i < tiempoArray.length; i++) {
        if (tiempoArray[i] === 'h') {
          horas = parseInt(tiempoArray[i - 1]);
        }
    
        if (tiempoArray[i] === 'min') {
          minutos = parseInt(tiempoArray[i - 1]);
        }
      }
    
      return horas * 60 + minutos;
    }
  
    return usersSend;
  }
  



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
window.onload = function() {
    verMejorRuta();
    //calcRoute();
};
console.log(users)
//create a Directions service object to use the route method and get a result for our request
// for our requestx|
var diretionsService = new google.maps.DirectionsService();
//create a DirectionsRenderer object which we will use to display route
var directionsDisplay = new google.maps.DirectionsRenderer();
//bind the diretionsRenderer to the Map
directionsDisplay.setMap(map);

async function calcRoute(time, destino, nameBranch, numConsult){
    //numConsult += 1
    console.log(document.getElementById("users-list").value)
    var request = {
        origin: ubicacion,
        destination: destino,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING AND TRANSIT
        unitSystem: google.maps.UnitSystem.IMPRERIAL
    }
    //Pass the request to the route method
    diretionsService.route(request, async (result, status) =>{
        if (status == google.maps.DirectionsStatus.OK){
            time = result.routes[0].legs[0].duration.text
            //get distance and time
            /*const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + 
            document.getElementById("from").value +
            ". <br />To: " + 
            document.getElementById("to").value +
            ". <br />Driving distance <i class='fas fa-road'></i> :" + 
            result.routes[0].legs[0].distance.text +
            ". <br />Duration <i class='fas fa-hourglass-start'></i> :" + 
            result.routes[0].legs[0].duration.text +
            ".</div>";*/
            //display route
            directionsDisplay.setDirections(result);
        } else {
            //delete the routes from map
            directionsDisplay.setDirections({routes: []});
            map.setCenter(mylatlng);
            //show error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle-start'></i>Could not retrieve driving distance. </div>";
        }
        //console.log(time)
        //console.log(destino)
        users.push({destino, nameBranch, time});
        console.log(numConsult, numConsult == 6)
        if(numConsult == 6){
            const usersOrdenados = ordenar(users)
            console.log(usersOrdenados)
            const nameSucursalElement = document.getElementById("nameSucursal");
            nameSucursalElement.textContent = String(usersOrdenados[0].nameBranch)
            await calcRoute(usersOrdenados[0].time, usersOrdenados[0].destino, usersOrdenados[0].nameBranch, 10)
            console.log(usersOrdenados[0].destino)
            //const li = document.createElement('li');
            for (let i = 0; i < usersOrdenados.length; i++) {
                const li = document.createElement('li');
                li.innerText = `Name: ${usersOrdenados[i].nameBranch}, Time: ${usersOrdenados[i].time}`;
                userList.appendChild(li);
            }
            
        }
        
    });

    return '';
}


function calcRouteFianl(destino){
    var request = {
        origin: ubicacion,
        destination: destino,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING AND TRANSIT
        unitSystem: google.maps.UnitSystem.IMPRERIAL
    }
    //Pass the request to the route method
    diretionsService.route(request, (result, status) =>{
        if (status == google.maps.DirectionsStatus.OK){
            //get distance and time
            /*const output = document.querySelector('#output');
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
            directionsDisplay.setDirections(result);*/
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