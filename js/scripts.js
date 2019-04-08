var mymap = L.map('map', {
	center: [40.674649,-73.844261],
	zoom: 11,
	minZoom: 9,
});

L.tileLayer('https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

var geosearchControl = L.esri.Geocoding.geosearch().addTo(mymap);

	var geosearchResults = L.layerGroup().addTo(mymap);

	geosearchControl.on('geosearchResults', function (data) {
	geosearchResults.clearLayers();

		for(var i = data.geosearchResults.length - 1; i>=0; i--){
				geosearchResults.addLayer(L.marker(data.geosearchResults[i].latlng));
	}
});

// the layer that automatically loads
var TotalVoteCountLayer = L.geoJson(QueensElectionDistricts, {
    style: defaultstyle,
    onEachFeature: onEachFeature
  }).addTo(mymap);

	// setting the default styling for assembly districts
	function assemblystyle(assemblyfeature) {
	  return {
	    fillColor: "purple",
			fillOpacity: .02,
	    color: "#2b2e5e",
		};
	}

// function to bind popup to assembly district
function assemblyOnEachFeature(afeature, QueensAssemblyDistricts) {
	  QueensAssemblyDistricts.bindPopup('<h4>Assembly District</h4>'+ ' ' + afeature.properties.AssemDist);
	}

var AssemblyOverlay = L.geoJSON(QueensAssemblyDistricts, {
    style: assemblystyle,
		onEachFeature: assemblyOnEachFeature,
})

// function to bind popup to council district
function councilOnEachFeature(cfeature, QueensCouncilDistricts) {
	  QueensCouncilDistricts.bindPopup('<h4>Council District</h4>'+ ' ' + cfeature.properties.CounDist);
	}

function councilstyle(councilfeature) {
	return {
		fillColor: "purple",
		fillOpacity: .02,
		color: '#2b2e5e',
	};
}

var CouncilOverlay = L.geoJson(QueensCouncilDistricts, {
	style: councilstyle,
	onEachFeature: councilOnEachFeature,
})

// CouncilOverlay.overlayPane().style.zIndex = 2000;

var CuomoLayer = L.geoJson(QueensElectionDistricts, {
  style: cuomostyle,
  onEachFeature: cuomoonEachFeature
})

var NixonLayer = L.geoJson(QueensElectionDistricts, {
  style: nixonstyle,
  onEachFeature: nixononEachFeature
})

// creating a group for all the base layers
var baselayers = {
		"Total Votes Cast": TotalVoteCountLayer,
    "Andrew Cuomo Votes": CuomoLayer,
    "Cynthia Nixon Votes": NixonLayer,
};

// creating a group for all the overlays
var overlays = {
			"NYS Assembly Districts": AssemblyOverlay,
			"NYC Council Districts": CouncilOverlay,
};

// creating a function that colors each ED by total votes cast
function totalvotecount(QueensCountyGovernorDemocraticPrimarySept2018_Total) {
    return QueensCountyGovernorDemocraticPrimarySept2018_Total > 350  ? '#980043' :
           QueensCountyGovernorDemocraticPrimarySept2018_Total > 300  ? '#dd1c77' :
           QueensCountyGovernorDemocraticPrimarySept2018_Total > 200  ? '#df65b0' :
           QueensCountyGovernorDemocraticPrimarySept2018_Total > 100  ? '#d7b5d8' :
           QueensCountyGovernorDemocraticPrimarySept2018_Total > 50   ? '#f1eef6' :
                                                                        '#ffffff'
      ;}

// setting the defaultstyle so that it equates to the colors assigned by the function above
function defaultstyle(feature) {
    return {
        fillColor: totalvotecount(feature.properties.QueensCountyGovernorDemocraticPrimarySept2018_Total),
        weight: 2,
        opacity: .001,
        fillOpacity: 1.0,
      };}

// creating a function that highlights each ED when it's hovered over
function highlightFeature(e) {
    var TotalVoteCountLayer = e.target;

    // the custom control that was made below is updated
    totalvotecountinfo.update(TotalVoteCountLayer.feature.properties);

    TotalVoteCountLayer.setStyle({
        weight: 5,
        color: '#666',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        TotalVoteCountLayer.bringToFront();
    }
}

// creating a function that resets the map when user hovers out
function resetHighlight(e) {
    TotalVoteCountLayer.resetStyle(e.target);

    // updating custom control based on mouseout
    totalvotecountinfo.update();
}

// creating zoom on election district click
function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
}

// creating a function that groups together the all hover events and the zoom funciton that was created
function onEachFeature(feature, TotalVoteCountLayer) {
    TotalVoteCountLayer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

// creating a custom div that changes the ed information within it based on mouseover
var totalvotecountinfo = L.control();

totalvotecountinfo.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'totalvotecountinfo'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
totalvotecountinfo.update = function (props) {
    this._div.innerHTML = '<h4>September 2018 Democratic Primary for Governor</h4>' + (props ?
        '<b>' + 'Election District' + ' ' + props.ElectDist + '</b><br/>' + props.QueensCountyGovernorDemocraticPrimarySept2018_Total + ' total votes cast'
        : 'Hover over an Electrion District to see the total # of votes cast');
};

totalvotecountinfo.addTo(mymap);

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
        '<b>' + 'Election District' + ' ' + + cuomoprops.ElectDist + '</b><br/>' + cuomoprops.QueensCountyGovernorDemocraticPrimarySept2018_Cuomo + ' votes cast'
        : 'Hover over an Electrion District to see votes cast for Cuomo');
  };

cuomoinfo.addTo(mymap);

$('.cuomoinfo').hide()

// creating a custom div that changes the ed information within it based on mouseover
var nixoninfo = L.control();

  nixoninfo.onAdd = function (nixonmap) {
    this._div = L.DomUtil.create('div', 'nixoninfo'); // create a div with a class "info"
    this.update();
    return this._div;
  };

// method that we will use to update the control based on feature properties passed
  nixoninfo.update = function (nixonprops) {
    this._div.innerHTML = '<h4>Votes for Cynthia Nixon</h4>' +  (nixonprops ?
        '<b>' + 'Election District' + ' ' + + nixonprops.ElectDist + '</b><br/>' + nixonprops.QueensCountyGovernorDemocraticPrimarySept2018_Nixon + ' votes cast'
        : 'Hover over an Electrion District to see votes cast for Nixon');
  };

nixoninfo.addTo(mymap);

$('.nixoninfo').hide()

// creating a legend for total votes cast
var totalvotecountlegend = L.control({position: 'topright'});

totalvotecountlegend.onAdd = function (map) {

    var totalvotecountlegenddiv = L.DomUtil.create('div', 'totalvotecountlegend'),
        grades = [0, 50, 100, 200, 300, 350],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        totalvotecountlegenddiv.innerHTML +=
            '<i style="background:' + totalvotecount(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return totalvotecountlegenddiv;
};

totalvotecountlegend.addTo(mymap);

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
function cuomostyle(cfeature) {
    return {
        fillColor: cuomocount(cfeature.properties.QueensCountyGovernorDemocraticPrimarySept2018_Cuomo),
        weight: 2,
        opacity: .001,
        fillOpacity: 1.0,
      };
}

// creating a function that highlights each ED when it's hovered over
function cuomohighlightFeature(c) {
    var CuomoLayer = c.target;

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
function cuomoresetHighlight(c) {
    CuomoLayer.resetStyle(c.target);

    // updating cuomo control based on mouseout
    cuomoinfo.update();
}

// creating zoom on election district click
function cuomozoomToFeature(c) {
    mymap.fitBounds(c.target.getBounds());
}

// creating a function that groups together the all hover events and the zoom funciton that was created
function cuomoonEachFeature(cfeature, CuomoLayer) {
    CuomoLayer.on({
        mouseover: cuomohighlightFeature,
        mouseout: cuomoresetHighlight,
        click: cuomozoomToFeature
    });
}

// creating a function that colors each ED by nixon votes
function nixoncount(QueensCountyGovernorDemocraticPrimarySept2018_Nixon) {
    return QueensCountyGovernorDemocraticPrimarySept2018_Nixon > 350  ? '#980043' :
           QueensCountyGovernorDemocraticPrimarySept2018_Nixon > 300  ? '#dd1c77' :
           QueensCountyGovernorDemocraticPrimarySept2018_Nixon > 200  ? '#df65b0' :
           QueensCountyGovernorDemocraticPrimarySept2018_Nixon > 100  ? '#d7b5d8' :
           QueensCountyGovernorDemocraticPrimarySept2018_Nixon > 50   ? '#f1eef6' :
                                                                        '#ffffff'
      ;}

// setting the nixonstyle so that it equates to the colors assigned by the function above
function nixonstyle(nfeature) {
    return {
        fillColor: nixoncount(nfeature.properties.QueensCountyGovernorDemocraticPrimarySept2018_Nixon),
        weight: 2,
        opacity: .001,
        fillOpacity: 1.0,
      };
}

// creating a function that highlights each ED when it's hovered over
function nixonhighlightFeature(n) {
    var NixonLayer = n.target;

   // the cuomo control that was made below is updated
    nixoninfo.update(NixonLayer.feature.properties);

    NixonLayer.setStyle({
        weight: 5,
        color: '#666',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        NixonLayer.bringToFront();
    }
}

// creating a function that resets the map when user hovers out
function nixonresetHighlight(n) {
    NixonLayer.resetStyle(n.target);
    // updating nixon control based on mouseout
    nixoninfo.update();
}

// creating zoom on election district click
function nixonzoomToFeature(n) {
    mymap.fitBounds(n.target.getBounds());
}

// creating a function that groups together the all hover events and the zoom funciton that was created
function nixononEachFeature(nfeature, NixonLayer) {
    NixonLayer.on({
        mouseover: nixonhighlightFeature,
        mouseout: nixonresetHighlight,
        click: nixonzoomToFeature
    });
}

// layer control added to map
L.control.layers(baselayers, overlays).addTo(mymap);

mymap.on('baselayerchange', function() {
    if (mymap.hasLayer(AssemblyOverlay)) {
        AssemblyOverlay.bringToFront();
    }
		if (mymap.hasLayer(CouncilOverlay)) {
				CouncilOverlay.bringToFront();
		}
		if (mymap.hasLayer(TotalVoteCountLayer)) {
			$('.totalvotecountinfo').show()
		}
		if (mymap.hasLayer(TotalVoteCountLayer)) {
			$('.cuomoinfo').hide()
		}
		if (mymap.hasLayer(TotalVoteCountLayer)) {
			$('.nixoninfo').hide()
		}
		if (mymap.hasLayer(CuomoLayer)) {
  		$('.cuomoinfo').show()
		}
		if (mymap.hasLayer(CuomoLayer)) {
		 	$('.nixoninfo').hide()
		}
		if (mymap.hasLayer(CuomoLayer)) {
			$('.totalvotecountinfo').hide();
		}
		if (mymap.hasLayer(NixonLayer)) {
			$('.nixoninfo').show()
		}
		if (mymap.hasLayer(NixonLayer)) {
			$('.cuomoinfo').hide()
		}
		if (mymap.hasLayer(NixonLayer)) {
			$('.totalvotecountinfo').hide()
		}
});
