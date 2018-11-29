function initMap() {

  var base = {};
  var geocoder = new google.maps.Geocoder();
  var lat,
    long,
    zip;
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
      showMap(lat, lng, base);
    });
}

function showMap(lat, lng, base) {

  var baseImage = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
  var map = new google.maps.Map(document.getElementById('map'), {
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

var url = "https://www.refugerestrooms.org/api/v1/restrooms/by_location.json?per_page=80&lat=" + lat + "&lng=" + lng;

console.log("url " + url);
  $.get(url)
  .done(function( data ) {
    addMarkers(map, base, baseImage, data);
  });
}

function addMarkers(map, base, baseImage, restrooms) {
  var basemarker = new google.maps.Marker({
    position: base,
    map: map,
    icon: baseImage
  });
  var basecontent = '<div>' + 'bathrooms' + '</div>';
  var baseinfowindow = new google.maps.InfoWindow({
    position: base,
    content: basecontent
  });
  //adds a click event listener to markers to open and view info window
  google.maps.event.addListener(basemarker, 'click', (function (basemarker, basecontent, baseinfowindow) {
    return function () {
      infowindow.setContent(basecontent);
      infowindow.open(map, basemarker);
    };
  })(basemarker, basecontent, baseinfowindow));

  //add all restroom markers to map
  for (var i = 0, len = restrooms.length; i < len; i++) {
    var markerPos = {
      lat: restrooms[i].latitude,
      lng: restrooms[i].longitude
    };
    var goldStar = {
      path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
      fillColor: 'yellow',
      fillOpacity: 0.8,
      scale: .2,
      strokeColor: 'gold',
      strokeWeight: 14
    };
    var marker = new google.maps.Marker({
      position: markerPos,
      map: map,
      icon: goldStar
    });
    var content = '<div>' + restrooms[i].name + '</div>' + '<div>' + restrooms[i].street + ', ' + restrooms[i].city +'</div>' + '<div>' + 'Distance(miles) ' + restrooms[i].distance.toFixed(2) + '</div>';
    var infowindow = new google.maps.InfoWindow({});
    google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
      return function () {
        infowindow.setContent(content);
        infowindow.open(map, marker);
      };
    })(marker, content, infowindow));
    marker.addListener('click', function () {
      infowindow.open(map, marker);
    });
  }
}

var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

