var mymap = L.map('map').setView([40.674649,-73.844261], 11);

L.tileLayer('https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

function totalvotecount(Queens_County_Governor_Democratic_Primary_Sept_2018_Total) {
    return Queens_County_Governor_Democratic_Primary_Sept_2018_Total > 400  ? '#980043' :
           Queens_County_Governor_Democratic_Primary_Sept_2018_Total > 300  ? '#dd1c77' :
           Queens_County_Governor_Democratic_Primary_Sept_2018_Total > 200  ? '#df65b0' :
           Queens_County_Governor_Democratic_Primary_Sept_2018_Total > 100  ? '#d7b5d8' :
           Queens_County_Governor_Democratic_Primary_Sept_2018_Total > 0   ? '#f1eef6' :
                      '#ffffff' ;}

function style(feature) {
    return {
        fillColor: totalvotecount(feature.properties.Queens_County_Governor_Democratic_Primary_Sept_2018_Total),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };}

var Sept2018Primary = L.geoJson(Sept2018Primary, {style: style}).addTo(mymap);
