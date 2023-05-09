const name = document.getElementById('name')
const ubicacion = document.getElementById('ubicacion')
const btn = document.getElementById('btn')


btn.addEventListener('click',() => {
  if (name.value === '' || name.value == null || ubicacion.value === '' || ubicacion.value == null){
    alert("Inserte todos los datos correctamente");
}
else{
    console.log("Hecho")
    window.location.href = "ruta";
}
});






var map = new maplibregl.Map({
    container: 'map',
    style:'https://api.maptiler.com/maps/basic-v2/style.json?key=gEwTz8EZKm1Uu0GCcZVM',
    // style:'https://api.maptiler.com/maps/bright-v2/style.json?key=gEwTz8EZKm1Uu0GCcZVM',
    //center: [-0.11,51.49],
     center: [-101.0520189, 20.8609607],
    zoom: 7
});

map.on('load', ()=>{
    map.addSource('Starts_points',{
    type:'geojson',
    data:'http://127.0.0.1:4000/api/users/geousers'
    });
    map.addLayer({
        'id':'Stars',
        'type':'symbol',
        'source':'Starts_points',
        'layout':{
            'icon-image':'Star_icon',
            'icon-size':0.05,
        }
    });
    map.loadImage('https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-star-512.png',
        (error,image)=>{
            if(error) throw error;
            map.addImage('Star_icon',image);
        });
});
