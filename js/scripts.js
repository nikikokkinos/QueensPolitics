var mymap = L.map('map').setView([40.674649,-73.844261], 11);

L.tileLayer('https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

// substantiating geojson to map
var QueensElectionDistricts = L.geoJson(QueensElectionDistricts, {
    style: defaultstyle,
    onEachFeature: onEachFeature
  }).addTo(mymap);

// creating a function that colors each ED by total votes cast
function totalvotecount(QueensCountyGovernorDemocraticPrimarySept2018_Total) {
    return QueensCountyGovernorDemocraticPrimarySept2018_Total > 350  ? '#980043' :
           QueensCountyGovernorDemocraticPrimarySept2018_Total > 300  ? '#dd1c77' :
           QueensCountyGovernorDemocraticPrimarySept2018_Total > 200  ? '#df65b0' :
           QueensCountyGovernorDemocraticPrimarySept2018_Total > 100  ? '#d7b5d8' :
           QueensCountyGovernorDemocraticPrimarySept2018_Total > 50   ? '#f1eef6' :
                                                                        '#ffffff'
      ;}

// setting the defaultstyle by total votes cast
function defaultstyle(feature) {
    return {
        fillColor: totalvotecount(feature.properties.QueensCountyGovernorDemocraticPrimarySept2018_Total),
        weight: 2,
        opacity: .001,
        fillOpacity: 1.0,
      };}

// creating a mouseover event listener
function highlightFeature(e) {
    var totalvotecountlayer = e.target;

    totalvotecountinfo.update(totalvotecountlayer.feature.properties);

    totalvotecountlayer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        totalvotecountlayer.bringToFront();
    }
}

// creating a mouseout event listener
function resetHighlight(e) {
    QueensElectionDistricts.resetStyle(e.target);
    totalvotecountinfo.update();
}

// creating zoom on election district click
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, totalvotecountlayer) {
    totalvotecountlayer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

var totalvotecountinfo = L.control();

totalvotecountinfo.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
totalvotecountinfo.update = function (props) {
    this._div.innerHTML = '<h4>September 2018 Democratic Primary for Governor</h4>' +  (props ?
        '<b>' + props.ElectDist + '</b><br/>' + props.QueensCountyGovernorDemocraticPrimarySept2018_Total + ' total votes cast'
        : 'Hover over an Electrion District to see voting results');
};

totalvotecountinfo.addTo(mymap);
