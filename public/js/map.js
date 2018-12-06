function initMap() {

  var base = {};
  var geocoder = new google.maps.Geocoder();
  var lat,
    long,
    zip;
  //get last searched lattitude and longitude if it is 0 then you use the current location

  //otherwise use the current location as the base
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
      lat = position.coords.latitude;
      lng = position.coords.longitude;
      //getZipCode(geocoder, lat, lng);
      console.log("This is the lattitude: " + lat);
      console.log("This is the longitude: " + lng);
      //initMap(lat, lng);
      base.lat = lat;
      base.lng = lng;
      $.get("/api/get/currentposition")
        .done(function (data) {
          if (data.lat && data.lng) {
            lat = parseFloat(data.lat);
            lng = parseFloat(data.lng);

          }
          showMap(lat, lng, base);
        });
    });

}

function showMap(lat, lng, base) {

  var baseImage = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
  var map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: lat,
      lng: lng
    },
    zoom: 15,
    center: base,
    label: {
      color: "white",
      fontWeight: "bold",
      text: "LocationName",
    },
    title: "Current ",
    icon: baseImage
  });



  //var restrooms = getRestrooms(lat, lng);

  var url = "https://www.refugerestrooms.org/api/v1/restrooms/by_location.json?per_page=70&lat=" + lat + "&lng=" + lng;

  console.log("url " + url);
  $.get(url)
    .done(function (data) {
      addBaseMarker(map, base, baseImage);
      addMarkers(map, data);
      $.get("/api/getnew/bathroom")
        .done(function (data) {
          console.log("data " + data);
          addMarkers(map, data.restrooms);
        });
    });
}

function addBaseMarker(map, base, baseImage) {
  var basemarker = new google.maps.Marker({
    position: base,
    map: map,
    icon: baseImage
  });
  var basecontent = "<div>" + "bathrooms" + "</div>";
  var baseinfowindow = new google.maps.InfoWindow({
    position: base,
    content: basecontent
  });
  //adds a click event listener to markers to open and view info window
  google.maps.event.addListener(basemarker, "click", (function (basemarker, basecontent, baseinfowindow) {
    return function () {
      infowindow.setContent(basecontent);
      infowindow.open(map, basemarker);
    };
  })(basemarker, basecontent, baseinfowindow));
}

function addMarkers(map, restrooms) {
  //add all restroom markers to map
  for (var i = 0, len = restrooms.length; i < len; i++) {
    var markerPos = {
      lat: restrooms[i].latitude,
      lng: restrooms[i].longitude
    };
    var goldStar = {
      path: "M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z",
      fillColor: "red",
      fillOpacity: 0.8,
      scale: .009,
      strokeColor: "red",
      strokeWeight: 14
    };
    var marker = new google.maps.Marker({
      position: markerPos,
      map: map,
      icon: goldStar
    });
    var content = "<div>" + restrooms[i].name + "</div>" + "<div>" + restrooms[i].street + ", " + restrooms[i].city + "</div>" + "<div>" + "Distance(miles) " + restrooms[i].distance.toFixed(2) + "</div>";
    var infowindow = new google.maps.InfoWindow({});
    google.maps.event.addListener(marker, "click", (function (marker, content, infowindow) {
      return function () {
        infowindow.setContent(content);
        infowindow.open(map, marker);
      };
    })(marker, content, infowindow));
    marker.addListener("click", function () {
      infowindow.open(map, marker);
    });
  }
}