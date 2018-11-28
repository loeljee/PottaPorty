// var markers = [{
//   'latitude': 33.11227,
//   'longitude': -117.1136,
//   'html': {
//     'content': "LISI MEDICAL JEROPA<br/>Escondido<br/><strong><a href='/Location/8049'>go to Location Page</a><strong>",
//     'popup': true
//   },
//   'icon': '/Content/Images/home_sm.png'
// }, {
//   'latitude': 33.12919,
//   'longitude': -117.1255,
//   'html': {
//     content: "Advanced Chemical Transport<br/>Escondido<br/><strong><a href='/Location/6461'>go to Location Page</a><strong>",
//     popup: false
//   }
// }, {
//   'latitude': 33.14339,
//   'longitude': -117.1636,
//   'html': {
//     content: "California State University<br/>San Marcos, CA<br/><strong><a href='/Location/6996'>go to Location Page</a><strong>",
//     popup: false
//   }
// }, {
//   'latitude': 33.18103,
//   'longitude': -117.1088,
//   'html': {
//     content: "Defense, US Dept of (Sec of Defense)<br/>Defense Media Activity-Riverside, CA<br/><strong><a href='/Location/860'>go to Location Page</a><strong>",
//     popup: false
//   }
// }, {
//   'latitude': 33.12268,
//   'longitude': -117.0819,
//   'html': {
//     content: "Escondido, City of<br/>Escondido-201 N Broadway<br/><strong><a href='/Location/984'>go to Location Page</a><strong>",
//     popup: false
//   }
// }, {
//   'latitude': 33.11983,
//   'longitude': -117.1134,
//   'html': {
//     content: "Ken Blanchard<br/>Escondido<br/><strong><a href='/Location/7575'>go to Location Page</a><strong>",
//     popup: false
//   }
// }, {
//   'latitude': 33.12328,
//   'longitude': -117.1112,
//   'html': {
//     content: "Mpower - Terminal Business Velocity<br/>California<br/><strong><a href='/Location/3420'>go to Location Page</a><strong>",
//     popup: false
//   }
// }, {
//   'latitude': 33.11326,
//   'longitude': -117.118,
//   'html': {
//     content: "One Stop Systems<br/>Escondido<br/><strong><a href='/Location/6500'>go to Location Page</a><strong>",
//     popup: false
//   }
// }, {
//   'latitude': 33.14871,
//   'longitude': -117.1864,
//   'html': {
//     content: "Palomar College<br/>Palomar<br/><strong><a href='/Location/7573'>go to Location Page</a><strong>",
//     popup: false
//   }
// }, {
//   'latitude': 33.12583,
//   'longitude': -117.0764,
//   'html': {
//     content: "Palomar Medical Center<br/>Escondido-555 East Valley Pkwy<br/><strong><a href='/Location/1806'>go to Location Page</a><strong>",
//     popup: false
//   }
// }, {
//   'latitude': 33.11953,
//   'longitude': -117.0882,
//   'html': {
//     content: "Palomar Pomerado Health System<br/>Palomar Medical Center<br/><strong><a href='/Location/5348'>go to Location Page</a><strong>",
//     popup: false
//   }
// }, {
//   'latitude': 33.12332,
//   'longitude': -117.1112,
//   'html': {
//     content: "Power Protection Services<br/>CA: Escondeto<br/><strong><a href='/Location/3417'>go to Location Page</a><strong>",
//     popup: false
//   }
// }, {
//   'latitude': 33.07244,
//   'longitude': -117.0674,
//   'html': {
//     content: "Sears, Roebuck and Co.<br/>Escondido, CA<br/><strong><a href='/Location/8729'>go to Location Page</a><strong>",
//     popup: false
//   }
// }, {
//   'latitude': 33.14461,
//   'longitude': -117.1836,
//   'html': {
//     content: "Signet Armorlite Inc<br/>San Marcos-1001 Armorlite Dr<br/><strong><a href='/Location/2131'>go to Location Page</a><strong>",
//     popup: false
//   }
// }, {
//   'latitude': 33.14461,
//   'longitude': -117.1836,
//   'html': {
//     content: "Signet Armorlite Inc.<br/>San Marcos - 1001 Armorlite<br/><strong><a href='/Location/2965'>go to Location Page</a><strong>",
//     popup: false
//   }
// }, {
//   'latitude': 33.11558,
//   'longitude': -117.1194,
//   'html': {
//     content: "Stone Brewing Co.<br/>Escondido<br/><strong><a href='/Location/6460'>go to Location Page</a><strong>",
//     popup: false
//   }
// }, {
//   'latitude': 33.13816,
//   'longitude': -117.1588,
//   'html': {
//     content: "University of Phoenix, San Marcos<br/>San Marcos-277 Rancheros Drive<br/><strong><a href='/Location/2446'>go to Location Page</a><strong>",
//     popup: false
//   }
// }];

function initMap() {

  var baseImage = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
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
      getZipCode(geocoder, lat, lng);
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



  var restrooms = getRestrooms(lat, lng);
  addMarkers(map, base, baseImage, restrooms);

  // var uluru = {
  //   lat: 33.103561,
  //   lng: -117.07617
  // };
  // var marker = new google.maps.Marker({
  //   position: uluru,
  //   map: map,
  //   title: "Trader Joe's"
  // });
  // marker.addListener('click', function () {
  //   infowindow.open(map, marker);
  // });

  function getRestrooms(lat, lng) {
    return JSON.parse('[{"id":33499,"name":"Trader Joe\'s","street":"Center City Pkwy","city":"Escondido","state":"Ca","accessible":true,"unisex":true,"directions":"Back of the store by bread","comment":"","latitude":33.103561,"longitude":-117.07617,"created_at":"2017-04-02T04:31:13.371Z","updated_at":"2017-04-02T04:31:13.371Z","downvote":0,"upvote":0,"country":"US","changing_table":false,"edit_id":33499,"approved":true,"distance":0.85072952537192,"bearing":"248.56126807468"},{"id":34608,"name":"California Center for the Arts Escondido","street":"340 N Escondido Blvd","city":"Escondido","state":"California","accessible":false,"unisex":true,"directions":"","comment":"you have to have a ticket if it\'s a show or concert but if it\'s a dance competition or something else you don\'t need tickets for you can just walk in","latitude":33.1223726,"longitude":-117.0846026,"created_at":"2017-04-27T20:19:51.157Z","updated_at":"2017-04-27T20:19:51.157Z","downvote":0,"upvote":0,"country":"US","changing_table":false,"edit_id":34608,"approved":true,"distance":1.56976856723142,"bearing":"301.999271327872"}]');
  };



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
      var marker = new google.maps.Marker({
        position: markerPos,
        map: map
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


// $(document).ready(function () {

// var geocoder = new google.maps.Geocoder(),
//   lat,
//   long,
//   zip;
// navigator.geolocation.getCurrentPosition(
//   function (position) {
//     console.log(position);


//     lat = position.coords.latitude;
//     lng = position.coords.longitude;
//     getZipCode(lat, lng);
//     console.log("This is the lattitude: " + lat);
//     console.log("This is the longitude: " + lng);
//     //initMap(lat, lng);

//   });

function getZipCode(geocoder, lat, long) {
  var latlng = {
    lat: lat,
    lng: long
  };
  geocoder.geocode({
    'location': latlng
  }, function (results, status) {
    if (status === 'OK') {
      if (results[0]) {
        for (j = 0; j < results[0].address_components.length; j++) {
          if (results[0].address_components[j].types[0] == 'postal_code') {
            console.log("Zip Code: " + results[0].address_components[j].short_name);
            zip = results[0].address_components[j].short_name;
            return;
          }
        }
      }
    }
  });
}
//});