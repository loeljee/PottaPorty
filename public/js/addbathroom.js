//Add event listeners to the submit and delete buttons
$(document).ready(function () {

    $("#bathroomform").submit(function (e) {
        e.preventDefault();


        var lat,
            geocoder,
            lng,
            zip;
        geocoder = new google.maps.Geocoder();
        var address = document.getElementById('restroom_street').value;
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == 'OK') {
                lat = results[0].geometry.location.lat();
                lng = results[0].geometry.location.lng();
                $("#restroom_longitude").val(lng);
                $("#restroom_latitude").val(lat);
                var data = $("#bathroomform").serialize();
                e.preventDefault();
                $.post("/api/add/bathroom", data, function (data, status) {
                    if (status === "success") {

                        location.href = "/";
                    } else
                        alert("insert failed!");
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });


    });
});