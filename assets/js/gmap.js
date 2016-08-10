var globalLong, globalLat, globalCountry;
var proceed = false;

var mapDiv = document.getElementById('googleMap');

function codeAddress() {
    var geocoder = new google.maps.Geocoder();
    var address = document.getElementById("address").value;
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            
            var country = results[0].address_components[results[0].address_components.length - 1].long_name;
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            //alert("Latitude : " + latitude + "   -   " + "Longitude : " + longitude);
            document.getElementById("latitude").value = latitude;
            document.getElementById("longitude").value = longitude;

            globalLat = latitude;
            globalLong = longitude;
            globalCountry = country;
            proceed = true;
            // console.log(latitude);
            // console.log(longitude);
            myFunctionTest(globalLat,globalLong);
            callAjax(globalCountry);

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



    //Cholera = WHS3_40
    //Diphtheria = WHS3_41
    //Meningitis = WHS3_47

//WHO API stuff

var testArray = [50, 19, 3, 5, 2, 3];

function makeChart(yArray) {
	var ctx = $("#myChart");

	var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: [10, 5, 2, 3, 11],
	        datasets: [{
	            label: '# of Votes',
	            data: yArray,
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	                'rgba(153, 102, 255, 0.2)',
	                'rgba(255, 159, 64, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255,99,132,1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero:true
	                }
	            }]
	        }
	    }
	});
}

makeChart(testArray);

//console.log(results[0].address_components[3].long_name)
//var longCountry = results[0].address_components[results[0].address_components.length - 1].long_name

function callAjax(country) {

    var countryAbb = [
        "ABW",
        "AFG",
        "AGO",
        "AIA",
        "ALA",
        "ALB",
        "AND",
        "ARE",
        "ARG",
        "ARM",
        "ASM",
        "ATA",
        "ATF",
        "ATG",
        "AUS",
        "AUT",
        "AZE",
        "BDI",
        "BEL",
        "BEN",
        "BES",
        "BFA",
        "BGD",
        "BGR",
        "BHR",
        "BHS",
        "BIH",
        "BLM",
        "BLR",
        "BLZ",
        "BMU",
        "BOL",
        "BRA",
        "BRB",
        "BRN",
        "BTN",
        "BVT",
        "BWA",
        "CAF",
        "CAN",
        "CCK",
        "CHE",
        "CHL",
        "CHN",
        "CIV",
        "CMR",
        "COD",
        "COG",
        "COK",
        "COL",
        "COM",
        "CPV",
        "CRI",
        "CUB",
        "CUW",
        "CXR",
        "CYM",
        "CYP",
        "CZE",
        "DEU",
        "DJI",
        "DMA",
        "DNK",
        "DOM",
        "DZA",
        "ECU",
        "EGY",
        "ERI",
        "ESH",
        "ESP",
        "EST",
        "ETH",
        "FIN",
        "FJI",
        "FLK",
        "FRA",
        "FRO",
        "FSM",
        "GAB",
        "GBR",
        "GEO",
        "GGY",
        "GHA",
        "GIB",
        "GIN",
        "GLP",
        "GMB",
        "GNB",
        "GNQ",
        "GRC",
        "GRD",
        "GRL",
        "GTM",
        "GUF",
        "GUM",
        "GUY",
        "HKG",
        "HMD",
        "HND",
        "HRV",
        "HTI",
        "HUN",
        "IDN",
        "IMN",
        "IND",
        "IOT",
        "IRL",
        "IRN",
        "IRQ",
        "ISL",
        "ISR",
        "ITA",
        "JAM",
        "JEY",
        "JOR",
        "JPN",
        "KAZ",
        "KEN",
        "KGZ",
        "KHM",
        "KIR",
        "KNA",
        "KOR",
        "KWT",
        "LAO",
        "LBN",
        "LBR",
        "LBY",
        "LCA",
        "LIE",
        "LKA",
        "LSO",
        "LTU",
        "LUX",
        "LVA",
        "MAC",
        "MAF",
        "MAR",
        "MCO",
        "MDA",
        "MDG",
        "MDV",
        "MEX",
        "MHL",
        "MKD",
        "MLI",
        "MLT",
        "MMR",
        "MNE",
        "MNG",
        "MNP",
        "MOZ",
        "MRT",
        "MSR",
        "MTQ",
        "MUS",
        "MWI",
        "MYS",
        "MYT",
        "NAM",
        "NCL",
        "NER",
        "NFK",
        "NGA",
        "NIC",
        "NIU",
        "NLD",
        "NOR",
        "NPL",
        "NRU",
        "NZL",
        "OMN",
        "PAK",
        "PAN",
        "PCN",
        "PER",
        "PHL",
        "PLW",
        "PNG",
        "POL",
        "PRI",
        "PRK",
        "PRT",
        "PRY",
        "PSE",
        "PYF",
        "QAT",
        "REU",
        "ROU",
        "RUS",
        "RWA",
        "SAU",
        "SDN",
        "SEN",
        "SGP",
        "SGS",
        "SHN",
        "SJM",
        "SLB",
        "SLE",
        "SLV",
        "SMR",
        "SOM",
        "SPM",
        "SRB",
        "SSD",
        "STP",
        "SUR",
        "SVK",
        "SVN",
        "SWE",
        "SWZ",
        "SXM",
        "SYC",
        "SYR",
        "TCA",
        "TCD",
        "TGO",
        "THA",
        "TJK",
        "TKL",
        "TKM",
        "TLS",
        "TON",
        "TTO",
        "TUN",
        "TUR",
        "TUV",
        "TWN",
        "TZA",
        "UGA",
        "UKR",
        "UMI",
        "URY",
        "USA",
        "UZB",
        "VAT",
        "VCT",
        "VEN",
        "VGB",
        "VIR",
        "VNM",
        "VUT",
        "WLF",
        "WSM",
        "YEM",
        "ZAF",
        "ZMB",
        "ZWE"
    ];

    var countryName = [
        "Aruba",
        "Afghanistan",
        "Angola",
        "Anguilla",
        "Åland Islands",
        "Albania",
        "Andorra",
        "United Arab Emirates",
        "Argentina",
        "Armenia",
        "American Samoa",
        "Antarctica",
        "French Southern Territories",
        "Antigua and Barbuda",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Burundi",
        "Belgium",
        "Benin",
        "Bonaire, Sint Eustatius and Saba",
        "Burkina Faso",
        "Bangladesh",
        "Bulgaria",
        "Bahrain",
        "Bahamas",
        "Bosnia and Herzegovina",
        "Saint Barthélemy",
        "Belarus",
        "Belize",
        "Bermuda",
        "Bolivia, Plurinational State of",
        "Brazil",
        "Barbados",
        "Brunei Darussalam",
        "Bhutan",
        "Bouvet Island",
        "Botswana",
        "Central African Republic",
        "Canada",
        "Cocos (Keeling) Islands",
        "Switzerland",
        "Chile",
        "China",
        "Côte d'Ivoire",
        "Cameroon",
        "Congo, the Democratic Republic of the",
        "Congo",
        "Cook Islands",
        "Colombia",
        "Comoros",
        "Cabo Verde",
        "Costa Rica",
        "Cuba",
        "Curaçao",
        "Christmas Island",
        "Cayman Islands",
        "Cyprus",
        "Czech Republic",
        "Germany",
        "Djibouti",
        "Dominica",
        "Denmark",
        "Dominican Republic",
        "Algeria",
        "Ecuador",
        "Egypt",
        "Eritrea",
        "Western Sahara",
        "Spain",
        "Estonia",
        "Ethiopia",
        "Finland",
        "Fiji",
        "Falkland Islands (Malvinas)",
        "France",
        "Faroe Islands",
        "Micronesia, Federated States of",
        "Gabon",
        "United Kingdom",
        "Georgia",
        "Guernsey",
        "Ghana",
        "Gibraltar",
        "Guinea",
        "Guadeloupe",
        "Gambia",
        "Guinea-Bissau",
        "Equatorial Guinea",
        "Greece",
        "Grenada",
        "Greenland",
        "Guatemala",
        "French Guiana",
        "Guam",
        "Guyana",
        "Hong Kong",
        "Heard Island and McDonald Islands",
        "Honduras",
        "Croatia",
        "Haiti",
        "Hungary",
        "Indonesia",
        "Isle of Man",
        "India",
        "British Indian Ocean Territory",
        "Ireland",
        "Iran, Islamic Republic of",
        "Iraq",
        "Iceland",
        "Israel",
        "Italy",
        "Jamaica",
        "Jersey",
        "Jordan",
        "Japan",
        "Kazakhstan",
        "Kenya",
        "Kyrgyzstan",
        "Cambodia",
        "Kiribati",
        "Saint Kitts and Nevis",
        "Korea, Republic of",
        "Kuwait",
        "Lao People's Democratic Republic",
        "Lebanon",
        "Liberia",
        "Libya",
        "Saint Lucia",
        "Liechtenstein",
        "Sri Lanka",
        "Lesotho",
        "Lithuania",
        "Luxembourg",
        "Latvia",
        "Macao",
        "Saint Martin (French part)",
        "Morocco",
        "Monaco",
        "Moldova, Republic of",
        "Madagascar",
        "Maldives",
        "Mexico",
        "Marshall Islands",
        "Macedonia, the former Yugoslav Republic of",
        "Mali",
        "Malta",
        "Myanmar",
        "Montenegro",
        "Mongolia",
        "Northern Mariana Islands",
        "Mozambique",
        "Mauritania",
        "Montserrat",
        "Martinique",
        "Mauritius",
        "Malawi",
        "Malaysia",
        "Mayotte",
        "Namibia",
        "New Caledonia",
        "Niger",
        "Norfolk Island",
        "Nigeria",
        "Nicaragua",
        "Niue",
        "Netherlands",
        "Norway",
        "Nepal",
        "Nauru",
        "New Zealand",
        "Oman",
        "Pakistan",
        "Panama",
        "Pitcairn",
        "Peru",
        "Philippines",
        "Palau",
        "Papua New Guinea",
        "Poland",
        "Puerto Rico",
        "Korea, Democratic People's Republic of",
        "Portugal",
        "Paraguay",
        "Palestine, State of",
        "French Polynesia",
        "Qatar",
        "Réunion",
        "Romania",
        "Russian Federation",
        "Rwanda",
        "Saudi Arabia",
        "Sudan",
        "Senegal",
        "Singapore",
        "South Georgia and the South Sandwich Islands",
        "Saint Helena, Ascension and Tristan da Cunha",
        "Svalbard and Jan Mayen",
        "Solomon Islands",
        "Sierra Leone",
        "El Salvador",
        "San Marino",
        "Somalia",
        "Saint Pierre and Miquelon",
        "Serbia",
        "South Sudan",
        "Sao Tome and Principe",
        "Suriname",
        "Slovakia",
        "Slovenia",
        "Sweden",
        "Swaziland",
        "Sint Maarten (Dutch part)",
        "Seychelles",
        "Syrian Arab Republic",
        "Turks and Caicos Islands",
        "Chad",
        "Togo",
        "Thailand",
        "Tajikistan",
        "Tokelau",
        "Turkmenistan",
        "Timor-Leste",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Tuvalu",
        "Taiwan, Province of China",
        "Tanzania, United Republic of",
        "Uganda",
        "Ukraine",
        "United States Minor Outlying Islands",
        "Uruguay",
        "United States",
        "Uzbekistan",
        "Holy See (Vatican City State)",
        "Saint Vincent and the Grenadines",
        "Venezuela, Bolivarian Republic of",
        "Virgin Islands, British",
        "Virgin Islands, U.S.",
        "Viet Nam",
        "Vanuatu",
        "Wallis and Futuna",
        "Samoa",
        "Yemen",
        "South Africa",
        "Zambia",
        "Zimbabwe"
    ];

    var abb;

    for (i = 0; i < countryAbb.length; i++) {
        if (country == countryName[i]) {
            abb = countryAbb[i];
        }
        else {
            console.log("not Match");
        }
    }

    //var countrySearch = "USA";
    
    //var infectiousDisease = "WHS3_40";
    var infectiousDisease = $('#diseaseSelect').val();

    console.log(infectiousDisease);

    var queryURL = "http://apps.who.int/gho/athena/api/GHO/" + infectiousDisease + "?filter=COUNTRY:" + abb + "&format=json";
    //var queryURL = "http://apps.who.int/gho/athena/api/GHO/WHS3_48?filter=COUNTRY:PER&format=json"

    console.log(queryURL);

    //var diseaseName = $('#cholera').data("disease");
    //console.log(diseaseName);

    var disease = document.getElementById("diseaseSelect");
    var selectedOption = disease.options[disease.selectedIndex];
    var diseaseName = selectedOption.getAttribute("data-disease");
    console.log(diseaseName);

    $('#countryP').text(country + " " + diseaseName + " Statistics");



    $.ajax({url: queryURL, method: "GET"}).done(function(CDCresponse) {

        console.log(CDCresponse);

        if (CDCresponse.fact.length < 1) {
            $('#countryStatistics').empty();
            $('#countryStatistics').text("No " + diseaseName + " data on World Health Organization API");
        } else {
            for (i = 0; i < CDCresponse.fact.length; i++) {
                for (j = 0; j < CDCresponse.fact[i].Dim.length; j++) {
                    if (CDCresponse.fact[i].Dim[j].category == "YEAR") {
                        
                        

                        var statDiv = $('<div>');

                        var statP = $('<p>');

                        statP.html("Year: " + CDCresponse.fact[i].Dim[j].code + "<br>" + "Reported of Reported Cases: " + Math.round(CDCresponse.fact[i].value.display));
                        
                        console.log("Year: " + CDCresponse.fact[i].Dim[j].code);
                        console.log("Reported of Reported Cases: " + Math.round(CDCresponse.fact[i].value.display));

                        statDiv.append(statP);
                        $('#countryStatistics').append(statDiv);
                    }
                }
            }

        }

        //return true
    });

}
