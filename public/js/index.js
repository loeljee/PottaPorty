// Add event listeners to the submit and delete buttons
$(document).ready(function () {
    $(".showlistview").on("click", function (e) {
        e.preventDefault();
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
                e.preventDefault();
                location.href = "/listview?lat=" + lat + "&lng=" + lng;
            });

    });

    $("#search").on("click", function (e) {
       
        var lat,
            geocoder,
            long,
            zip;
            geocoder = new google.maps.Geocoder();
            var address = document.getElementById('inlineFormInput').value;
            geocoder.geocode( { 'address': address}, function(results, status) {
              if (status == 'OK') {
                lat = results[0].geometry.location.lat();
                lng = results[0].geometry.location.lng();
                e.preventDefault();
                location.href = "/listview?lat=" + lat + "&lng=" + lng; 
              } else {
                alert('Geocode was not successful for the following reason: ' + status);
              }
            });

    });
});

