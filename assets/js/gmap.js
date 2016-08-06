var globalLong, globalLat;
var proceed = false;

var mapDiv = document.getElementById('googleMap');

function codeAddress() {
    var geocoder = new google.maps.Geocoder();
    var address = document.getElementById("address").value;
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            //alert("Latitude : " + latitude + "   -   " + "Longitude : " + longitude);
            document.getElementById("latitude").value = latitude;
            document.getElementById("longitude").value = longitude;

            globalLat = latitude;
            globalLong = longitude;
            proceed = true;
            // console.log(latitude);
            // console.log(longitude);
            myFunctionTest(globalLat,globalLong);

        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}


function myFunctionTest(x,y){

    if(proceed){
     console.log(globalLat,globalLong);


        var myCenter = new google.maps.LatLng(globalLat, globalLong);
            var mapProp = {
            center: myCenter,
            zoom: 12,
            scrollwheel: false,
            draggable: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

        var marker = new google.maps.Marker({
            position: myCenter,
        });
        marker.setMap(map);


    }else{
        console.log("No location found!");
    }
}