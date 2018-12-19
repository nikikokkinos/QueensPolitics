// this js is established to create overlay layers on mymap

var AssemblyOverlay = L.geoJSON(AssemblyOverlay, {
  fillColor: "#2b2e5e",
  fillOpacity: .5,
  color: "#2b2e5e",
})

var overlays = {
  "NYS Assembly Districts": AssemblyOverlay,
};

L.control.layers(overlays).addTo(mymap);
