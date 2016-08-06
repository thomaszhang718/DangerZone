
var mapDiv = $('#googleMap');

$('form').on('click', "#submitButton", function() {
    geoObject.address = $("#address").val();
    console.log(geoObject.address);

    geoObject.convertAddress();

    return false;
})

var geoObject = {
    address:"",
    longitude:0,
    latitude:0,
    proceed:false,

    convertAddress: function () {
        console.log("it works");

        var geocoder = new google.maps.Geocoder();
        var localAddress = geoObject.address;
        geocoder.geocode({
            'address': localAddress
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                geoObject.latitude = results[0].geometry.location.lat();
                geoObject.longitude = results[0].geometry.location.lng();

                console.log("Latitude : " + geoObject.latitude + "   -   " + "Longitude : " + geoObject.longitude);

                geoObject.proceed = true;

                myFunctionTest(geoObject.latitude, geoObject.longitude);

            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    },
}


function myFunctionTest(latitudeL,longitudeL){
    if(geoObject.proceed){
     console.log(latitudeL, longitudeL);


        var myCenter = new google.maps.LatLng(latitudeL, longitudeL);
            var mapProp = {
            center: myCenter,
            zoom: 12,
            scrollwheel: false,
            draggable: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(mapDiv, mapProp);

        var marker = new google.maps.Marker({
            position: myCenter,
        });
        marker.setMap(map);


    }else{
        console.log("No location found!");
    }
}