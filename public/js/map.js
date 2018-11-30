/*eslint linebreak-style: ["error", "windows"]*/
//var markers = @(Html.GetGoMapMarkerArray(Model));032154541230

// function showMap() {
//   var baseImage = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
//   var base = {
//     lat: 33.1087872,
//     lng: -117.06204160000001};
//   var map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 4,
//     center: base,
//     label: {
//       color: "white",
//       fontWeight: "bold",
//       text: "LocationName",
//     },
//     title: "Bathroooms",
//     icon: baseImage
//   });
  //google.maps.event.addDomListener(window, "load", initMap());


    // var basemarker = new google.maps.Marker({
    //     position: base,
    //     map: map,
    //     icon: baseImage
    // });
    // var basecontent = '<div>' + 'bathrooms' + '</div>';
    // var baseinfowindow = new google.maps.InfoWindow({
    //     position: base,
    //     content: basecontent
    // });
    // google.maps.event.addListener(basemarker, 'click', (function (basemarker, basecontent, baseinfowindow) {
    //     return function () {
    //         infowindow.setContent(basecontent);
    //         infowindow.open(map, basemarker);
    //     };
    // })(basemarker, basecontent, baseinfowindow));
    // for (var i = 0, len = markers.length; i < len; i++) {
    //     var markerPos = {
    //         lat: markers[i].latitude,
    //         lng: markers[i].longitude
    //     };
    //     var marker = new google.maps.Marker({
    //         position: markerPos,
    //         map: map
    //     });
    //     var content = '<div>' + markers[i].html.content + '</div>';
    //     var infowindow = new google.maps.InfoWindow({});
    //     google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
    //         return function () {
    //             infowindow.setContent(content);
    //             infowindow.open(map, marker);
    //         };
    //     })(marker, content, infowindow));
    //     marker.addListener('click', function () {
    //         infowindow.open(map, marker);
    //     });
    // }
//}
