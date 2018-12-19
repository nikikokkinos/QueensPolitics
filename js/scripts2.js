// this js is established to create overlay layers on mymap

var AssemblyOverlay = L.geoJSON(QueensAssemblyDistricts, {
  fillColor: "none",
  fillOpacity: .5,
  color: "#2b2e5e",
  onEachFeature: assemblyonEachFeature
})

var CouncilOverlay = L.geoJson(QueensCouncilDistricts, {
  fillColor: "none",
  fillOpacity: .5,
  color: "#2b2e5e",
})

var overlays = {
  "NYS Assembly Districts": AssemblyOverlay,
  "NYC Council Districts": CouncilOverlay,
};

L.control.layers(overlays).addTo(mymap);

// all controls for AssemblyOverlay to add interaction to layer

// creating a mouseover event listener function for assembly districts
function assemblyhighlightFeature(e) {
    var AssemblyOverlay = e.target;

    // updating custom control based on mouseover
    assemblyinfo.update(AssemblyOverlay.feature.properties);

    AssemblyOverlay.setStyle({
        weight: 5,
        color: 'none',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        AssemblyOverlay.bringToFront();
    }
}

// creating a mouseout event listener
function assemblyresetHighlight(e) {
    AssemblyOverlay.resetStyle(e.target);

// updating custom control based on mouseout
    assemblyinfo.update();
}

// creating zoom on election district click
function assemblyzoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
}

// creating a function that performs mouseover, mouseout, and zooms on the geoJson
function assemblyonEachFeature(feature, AssemblyOverlay) {
    AssemblyOverlay.on({
        mouseover: assemblyhighlightFeature,
        mouseout: assemblyresetHighlight,
        click: assemblyzoomToFeature
    });
}

// creating a custom control that changes information within it based on mouseover
var assemblyinfo = L.control();

assemblyinfo.onAdd = function (assemblymap) {
    this._div = L.DomUtil.create('div', 'assemblyinfo'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
assemblyinfo.update = function (assemblyprops) {
    this._div.innerHTML = '<h4>Assembly District</h4>' +  (assemblyprops ?
        '<b>' + assemblyprops.AssemDist : 'Hover to find the Assembly Distrct');};

        // // method that we will use to update the control based on feature properties passed
        // totalvotecountinfo.update = function (props) {
        //     this._div.innerHTML = '<h4>September 2018 Democratic Primary for Governor</h4>' +  (props ?
        //         '<b>' + props.ElectDist + '</b><br/>' + props.QueensCountyGovernorDemocraticPrimarySept2018_Total + ' total votes cast'
        //         : 'Hover over an Electrion District to see voting results');
        // };

assemblyinfo.addTo(mymap);
