var mymap = L.map('map').setView([40.674649,-73.844261], 11);

L.tileLayer('https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

var Sept2018Primary = L.geoJSON (Sept2018Primary, {
  fillColor: "#c13432",
  fillOpacity: .5,
  weight: 1,
  color: "#c13432",
}).addTo(mymap);
