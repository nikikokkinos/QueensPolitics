// this js is established to create overlay layers on mymap

var AssemblyOverlay = L.geoJSON(QueensAssemblyDistricts, {
  fillColor: "none",
  fillOpacity: .5,
  color: "#2b2e5e",
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
