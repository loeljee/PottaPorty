//Add event listeners to the submit and delete buttons
$(document).ready(function () {
    $("#bathroomform").submit( function (e) {
        e.preventDefault();
        var data = $("#bathroomform").serialize();
        $.post("/api/add/bathroom", data, function(data, status){
            if(status === "success")
                location.href = "/";
            else
                alert("insert failed!");
        });   
    });
});