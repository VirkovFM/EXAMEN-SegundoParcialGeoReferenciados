var map = new maplibregl.Map({
    container: 'map',
    style:'https://api.maptiler.com/maps/basic-v2/style.json?key=gEwTz8EZKm1Uu0GCcZVM',
    //center: [-101.6313894764541, 21.166128124361702],
    center: [-0.11,51.49],
    zoom: 15
});
var london = new maplibregl.Marker()
.setLngLat([-0.11,51.49])
//.setLngLat([-101.6313894764541, 21.166128124361702])
.addTo(map);