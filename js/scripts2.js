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

var CuomoLayer = L.geoJson(QueensElectionDistricts, {
    style: cuomostyle,
    onEachFeature: cuomoonEachFeature
  })

var baselayers = {
    "Andrew Cuomo Votes": CuomoLayer,
  };

var overlays = {
  "NYS Assembly Districts": AssemblyOverlay,
  "NYC Council Districts": CouncilOverlay,
};

L.control.layers(baselayers, overlays).addTo(mymap);

// controls & styling for CuomoLayer

// creating a function that colors each ED by cuomo votes
function cuomocount(QueensCountyGovernorDemocraticPrimarySept2018_Cuomo) {
    return QueensCountyGovernorDemocraticPrimarySept2018_Cuomo > 350  ? '#980043' :
           QueensCountyGovernorDemocraticPrimarySept2018_Cuomo > 300  ? '#dd1c77' :
           QueensCountyGovernorDemocraticPrimarySept2018_Cuomo > 200  ? '#df65b0' :
           QueensCountyGovernorDemocraticPrimarySept2018_Cuomo > 100  ? '#d7b5d8' :
           QueensCountyGovernorDemocraticPrimarySept2018_Cuomo > 50   ? '#f1eef6' :
                                                                        '#ffffff'
      ;}

// setting the cuomostyle so that it equates to the colors assigned by the function above
function cuomostyle(feature) {
    return {
        fillColor: cuomocount(feature.properties.QueensCountyGovernorDemocraticPrimarySept2018_Cuomo),
        weight: 2,
        opacity: .001,
        fillOpacity: 1.0,
      };
}

// creating a function that highlights each ED when it's hovered over
function cuomohighlightFeature(e) {
    var CuomoLayer = e.target;

   // the cuomo control that was made below is updated
    cuomoinfo.update(CuomoLayer.feature.properties);

    CuomoLayer.setStyle({
        weight: 5,
        color: '#666',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        CuomoLayer.bringToFront();
    }
}

// creating a function that resets the map when user hovers out
function cuomoresetHighlight(e) {
    CuomoLayer.resetStyle(e.target);

    // updating cuomo control based on mouseout
    cuomoinfo.update();
}

// creating zoom on election district click
function cuomozoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
}

// creating a function that groups together the all hover events and the zoom funciton that was created
function cuomoonEachFeature(feature, CuomoLayer) {
    CuomoLayer.on({
        mouseover: cuomohighlightFeature,
        mouseout: cuomoresetHighlight,
        click: cuomozoomToFeature
    });
}

// creating a custom div that changes the ed information within it based on mouseover
var cuomoinfo = L.control();

  cuomoinfo.onAdd = function (cuomomap) {
    this._div = L.DomUtil.create('div', 'cuomoinfo'); // create a div with a class "info"
    this.update();
    return this._div;
  };

// method that we will use to update the control based on feature properties passed
  cuomoinfo.update = function (cuomoprops) {
    this._div.innerHTML = '<h4>Votes for Andrew M. Cuomo</h4>' +  (cuomoprops ?
        '<b>' + cuomoprops.ElectDist + '</b><br/>' + cuomoprops.QueensCountyGovernorDemocraticPrimarySept2018_Cuomo + ' total votes cast'
        : 'Hover over an Electrion District to see voting results');
  };

// cuomoinfo.addTo(mymap);

// all controls for AssemblyOverlay to add interaction to layer

// creating a function that highlights the ad when it's hovered over
function assemblyhighlightFeature(e) {
    var AssemblyOverlay = e.target;

    // updating custom control based on user hover
    assemblyinfo.update(AssemblyOverlay.feature.properties);

    // setting styling for ads
    AssemblyOverlay.setStyle({
        weight: 5,
        color: 'none',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        AssemblyOverlay.bringToFront();
    }
}

// creating a functiont that resets highlight when user hovers out
function assemblyresetHighlight(e) {
    AssemblyOverlay.resetStyle(e.target);

// updating custom control based on mouseout
    assemblyinfo.update();
}

// creating zoom on election district click
function assemblyzoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
}

// creating a function that groups together all the hover events and the zoom
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

// assemblyinfo.addTo(mymap);
