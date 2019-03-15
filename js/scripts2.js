// // this js is established to create overlay layers on mymap
//
// var AssemblyOverlay = L.geoJSON(QueensAssemblyDistricts, {
//     style: assemblystyle,
// })
//
// var CouncilOverlay = L.geoJson(QueensCouncilDistricts, {
//   fillColor: "none",
//   color: "#2b2e5e",
// })
//
// var CuomoLayer = L.geoJson(QueensElectionDistricts, {
//     style: cuomostyle,
//     onEachFeature: cuomoonEachFeature
// })
//
// var NixonLayer = L.geoJson(QueensElectionDistricts, {
//     style: nixonstyle,
//     onEachFeature: nixononEachFeature
// })
//
// var baselayers = {
//     "Andrew Cuomo Votes": CuomoLayer,
//     "Cynthia Nixon Votes": NixonLayer,
//     "Total Votes Cast": totalvotecountlayer,
// };
//
// var overlays = {
//   "NYS Assembly Districts": AssemblyOverlay,
//   "NYC Council Districts": CouncilOverlay,
// };
//
// L.control.layers(baselayers, overlays).addTo(mymap);
//
// mymap.on('baselayerchange', function(eventLayer) {
//   if (eventLayer.name === 'Total Votes Cast'){
//   $('.totalvotecountinfo').show()
//   }
//   if (eventLayer.name === 'Total Votes Cast'){
//   $('.cuomoinfo').hide()
//   }
//   if (eventLayer.name === 'Total Votes Cast'){
//   $('.nixoninfo').hide()
//   }
//   if (eventLayer.name === 'Cynthia Nixon Votes'){
//   $('.nixoninfo').show()
//   }
//   if (eventLayer.name === 'Cynthia Nixon Votes'){
//   $('.cuomoinfo').hide()
//   }
//   if (eventLayer.name === 'Cynthia Nixon Votes'){
//   $('.totalvotecountinfo').hide()
//   }
//   if (eventLayer.name === 'Andrew Cuomo Votes'){
//   $('.cuomoinfo').show()
//   }
//   if (eventLayer.name === 'Andrew Cuomo Votes'){
//   $('.nixoninfo').hide()
//   }
//   if (eventLayer.name === 'Andrew Cuomo Votes'){
//   $('.totalvotecountinfo').hide()
//   }
// });
//
// // Assembly District code
//
// // setting the default styling for assembly districts
// function assemblystyle(featurez) {
//   return {
//     fillColor: "none",
//     color: "#2b2e5e",
//   };
// }
//
// // // setting the highlight on mouseover styling for assembly districts
// // // function assemblyhighlightFeature(a) {
// // //   var AssemblyOverlay = a.target;
// // //   AssemblyOverlay.setStyle({
// // //       weight: 5,
// // //       color: '#666',
// // //       fillOpacity: 0.7
// // //   });
// //
// // // code to bind a popup on assembly district mouseover
// //
// //
// // // bringing the assembly district to the front
// // if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
// //     AssemblyOverlay.bringToFront();
// //   }
// //
// // // // creating a function that resets the map when user hovers out
// // // function assemblyresetHighlight(a) {
// // //     AssemblyOverlay.resetStyle(a.target);
// // //     // // updating cuomo control based on mouseout
// // //     // cuomoinfo.update();
// // // }
// //
// // // creating zoom on assembly district click
// // function assemblyzoomToFeature(a) {
// //     mymap.fitBounds(a.target.getBounds());
// // }
// //
// // // creating a function that groups together the all hover events and the zoom funciton that was created
// // function assemblyonEachFeature(featurez, AssemblyOverlay) {
// //     AssemblyOverlay.on({
// //         // mouseover: assemblyhighlightFeature,
// //         // mouseout: assemblyresetHighlight,
// //         click: assemblyzoomToFeature
// //     });
// // }
//
// // controls & styling for CuomoLayer
//
// // creating a function that colors each ED by cuomo votes
// function cuomocount(QueensCountyGovernorDemocraticPrimarySept2018_Cuomo) {
//     return QueensCountyGovernorDemocraticPrimarySept2018_Cuomo > 350  ? '#980043' :
//            QueensCountyGovernorDemocraticPrimarySept2018_Cuomo > 300  ? '#dd1c77' :
//            QueensCountyGovernorDemocraticPrimarySept2018_Cuomo > 200  ? '#df65b0' :
//            QueensCountyGovernorDemocraticPrimarySept2018_Cuomo > 100  ? '#d7b5d8' :
//            QueensCountyGovernorDemocraticPrimarySept2018_Cuomo > 50   ? '#f1eef6' :
//                                                                         '#ffffff'
//       ;}
//
// // setting the cuomostyle so that it equates to the colors assigned by the function above
// function cuomostyle(feature) {
//     return {
//         fillColor: cuomocount(feature.properties.QueensCountyGovernorDemocraticPrimarySept2018_Cuomo),
//         weight: 2,
//         opacity: .001,
//         fillOpacity: 1.0,
//       };
// }
//
// // creating a function that highlights each ED when it's hovered over
// function cuomohighlightFeature(e) {
//     var CuomoLayer = e.target;
//
//    // the cuomo control that was made below is updated
//     cuomoinfo.update(CuomoLayer.feature.properties);
//
//     CuomoLayer.setStyle({
//         weight: 5,
//         color: '#666',
//         fillOpacity: 0.7
//     });
//
//     if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
//         CuomoLayer.bringToFront();
//     }
// }
//
// // creating a function that resets the map when user hovers out
// function cuomoresetHighlight(e) {
//     CuomoLayer.resetStyle(e.target);
//
//     // updating cuomo control based on mouseout
//     cuomoinfo.update();
// }
//
// // creating zoom on election district click
// function cuomozoomToFeature(e) {
//     mymap.fitBounds(e.target.getBounds());
// }
//
// // creating a function that groups together the all hover events and the zoom funciton that was created
// function cuomoonEachFeature(feature, CuomoLayer) {
//     CuomoLayer.on({
//         mouseover: cuomohighlightFeature,
//         mouseout: cuomoresetHighlight,
//         click: cuomozoomToFeature
//     });
// }
//
// // creating a custom div that changes the ed information within it based on mouseover
// var cuomoinfo = L.control();
//
//   cuomoinfo.onAdd = function (cuomomap) {
//     this._div = L.DomUtil.create('div', 'cuomoinfo'); // create a div with a class "info"
//     this.update();
//     return this._div;
//   };
//
// // method that we will use to update the control based on feature properties passed
//   cuomoinfo.update = function (cuomoprops) {
//     this._div.innerHTML = '<h4>Votes for Andrew M. Cuomo</h4>' +  (cuomoprops ?
//         '<b>' + 'Election District' + ' ' + + cuomoprops.ElectDist + '</b><br/>' + cuomoprops.QueensCountyGovernorDemocraticPrimarySept2018_Cuomo + ' votes cast'
//         : 'Hover over an Electrion District to see voting results');
//   };
//
// cuomoinfo.addTo(mymap);
//
// $('.cuomoinfo').hide()
//
// // creating a function that colors each ED by nixon votes
// function nixoncount(QueensCountyGovernorDemocraticPrimarySept2018_Nixon) {
//     return QueensCountyGovernorDemocraticPrimarySept2018_Nixon > 350  ? '#980043' :
//            QueensCountyGovernorDemocraticPrimarySept2018_Nixon > 300  ? '#dd1c77' :
//            QueensCountyGovernorDemocraticPrimarySept2018_Nixon > 200  ? '#df65b0' :
//            QueensCountyGovernorDemocraticPrimarySept2018_Nixon > 100  ? '#d7b5d8' :
//            QueensCountyGovernorDemocraticPrimarySept2018_Nixon > 50   ? '#f1eef6' :
//                                                                         '#ffffff'
//       ;}
//
// // setting the nixonstyle so that it equates to the colors assigned by the function above
// function nixonstyle(feature) {
//     return {
//         fillColor: nixoncount(feature.properties.QueensCountyGovernorDemocraticPrimarySept2018_Nixon),
//         weight: 2,
//         opacity: .001,
//         fillOpacity: 1.0,
//       };
// }
//
// // creating a function that highlights each ED when it's hovered over
// function nixonhighlightFeature(e) {
//     var NixonLayer = e.target;
//
//    // the cuomo control that was made below is updated
//     nixoninfo.update(NixonLayer.feature.properties);
//
//     NixonLayer.setStyle({
//         weight: 5,
//         color: '#666',
//         fillOpacity: 0.7
//     });
//
//     if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
//         NixonLayer.bringToFront();
//     }
// }
//
// // creating a function that resets the map when user hovers out
// function nixonresetHighlight(e) {
//     NixonLayer.resetStyle(e.target);
//
//     // updating nixon control based on mouseout
//     nixoninfo.update();
// }
//
// // creating zoom on election district click
// function nixonzoomToFeature(e) {
//     mymap.fitBounds(e.target.getBounds());
// }
//
// // creating a function that groups together the all hover events and the zoom funciton that was created
// function nixononEachFeature(feature, NixonLayer) {
//     NixonLayer.on({
//         mouseover: nixonhighlightFeature,
//         mouseout: nixonresetHighlight,
//         click: nixonzoomToFeature
//     });
// }
//
// // creating a custom div that changes the ed information within it based on mouseover
// var nixoninfo = L.control();
//
//   nixoninfo.onAdd = function (cuomomap) {
//     this._div = L.DomUtil.create('div', 'nixoninfo'); // create a div with a class "info"
//     this.update();
//     return this._div;
//   };
//
// // method that we will use to update the control based on feature properties passed
//   nixoninfo.update = function (nixonprops) {
//     this._div.innerHTML = '<h4>Votes for Cynthia Nixon</h4>' +  (nixonprops ?
//         '<b>' + 'Election District' + ' ' + + nixonprops.ElectDist + '</b><br/>' + nixonprops.QueensCountyGovernorDemocraticPrimarySept2018_Nixon + ' votes cast'
//         : 'Hover over an Electrion District to see voting results');
//   };
//
// nixoninfo.addTo(mymap);
//
// $('.nixoninfo').hide()
