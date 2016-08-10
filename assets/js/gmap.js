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

// ALL CHART FUNCTIONS BELOW
var chartStuff = {
    yearsPlotted:[2000, 2001, 2002, 2003, 2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014], 

    //Info from ajax call
    yearsRecorded:[],
    casesReported:[],

    casesPlotted:[],


    sortCases: function(){

        for (var i=0; i<this.yearsPlotted.length; i++){
            for (var j=0; j<this.yearsRecorded.length;j++){
                if (this.yearsRecorded[j] == this.yearsPlotted[i]){
                    this.casesPlotted[i] = this.casesReported[j];
                }
            }
        }

        console.log(this.yearsRecorded);
        console.log(this.casesReported);

        console.log(this.yearsPlotted);
        console.log(this.casesPlotted);
    },

    makeChart: function () {
    	var chartDiv = $("#myChart");

    	var myChart = new Chart(chartDiv, {
    	    type: 'line',
    	    data: {
    	        labels: this.yearsPlotted,
    	        datasets: [{
    	            label: '# of Reported Cases',
    	            data: this.casesPlotted,
    	            backgroundColor: [
    	                'rgba(0, 0, 0, 0)',
    	            ],
    	            borderColor: [
    	                'rgba(68,93,110,1)',
    	            ],
    	            borderWidth: 2,
                    spanGaps: true,                  
    	        }],
    	    },

    	    options: {

    	        scales: {
    	            yAxes: [{
                        gridLines:{
                            display:false,
                            drawBorder:true,
                        },
                        scaleLabel:{
                            display:true,
                            labelString:"Number of Reported Cases",
                        },                                           
    	                ticks: {
    	                    beginAtZero:true
    	                },
    	            }],
                    xAxes: [{
                        gridLines:{
                            display:false,
                            drawBorder:true,
                            label:"good",
                        },
                        scaleLabel:{
                            display:true,
                            labelString:"Year",
                        },                                             
                        ticks: {
                            beginAtZero:true
                        },
                    }]                    
    	        },
                legend:{
                    display:false,
                },
    	    }
    	});
    },

    emptyChart: function(){
        this.yearsRecorded = [];
        this.casesReported = [];
        this.casesPlotted = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
}
//////////////////////////////////

//console.log(results[0].address_components[3].long_name)
//var longCountry = results[0].address_components[results[0].address_components.length - 1].long_name

function callAjax(country) {

    var countryAbb = [
        "ABW","AFG","AGO","AIA","ALA","ALB","AND","ARE","ARG","ARM","ASM","ATA","ATF","ATG","AUS","AUT","AZE",
        "BDI","BEL","BEN","BES","BFA","BGD","BGR","BHR","BHS","BIH","BLM","BLR","BLZ","BMU","BOL","BRA","BRB","BRN","BTN","BVT","BWA",
        "CAF","CAN","CCK","CHE","CHL","CHN","CIV","CMR","COD","COG","COK","COL","COM","CPV","CRI","CUB","CUW","CXR","CYM","CYP","CZE",
        "DEU","DJI","DMA","DNK","DOM","DZA","ECU","EGY","ERI","ESH","ESP","EST","ETH","FIN","FJI","FLK","FRA","FRO","FSM",
        "GAB","GBR","GEO","GGY","GHA","GIB","GIN","GLP","GMB","GNB","GNQ","GRC","GRD","GRL","GTM","GUF","GUM","GUY",
        "HKG","HMD","HND","HRV","HTI","HUN","IDN","IMN","IND","IOT","IRL","IRN","IRQ","ISL","ISR","ITA","JAM","JEY","JOR","JPN",
        "KAZ","KEN","KGZ","KHM","KIR","KNA","KOR","KWT","LAO","LBN","LBR","LBY","LCA","LIE","LKA","LSO","LTU","LUX","LVA",
        "MAC","MAF","MAR","MCO","MDA","MDG","MDV","MEX","MHL","MKD","MLI","MLT","MMR","MNE","MNG","MNP","MOZ","MRT","MSR","MTQ","MUS","MWI","MYS","MYT","NAM",
        "NCL","NER","NFK","NGA","NIC","NIU","NLD","NOR","NPL","NRU","NZL","OMN","PAK","PAN","PCN","PER","PHL","PLW","PNG","POL","PRI","PRK","PRT","PRY","PSE","PYF",
        "QAT","REU","ROU","RUS","RWA","SAU","SDN","SEN","SGP","SGS","SHN","SJM","SLB","SLE","SLV","SMR","SOM","SPM","SRB","SSD","STP","SUR","SVK","SVN","SWE","SWZ","SXM","SYC","SYR",
        "TCA","TCD","TGO","THA","TJK","TKL","TKM","TLS","TON","TTO","TUN","TUR","TUV","TWN","TZA",
        "UGA","UKR","UMI","URY","USA","UZB","VAT","VCT","VEN","VGB","VIR","VNM","VUT","WLF","WSM","YEM","ZAF","ZMB","ZWE"
    ];

    var countryName = [
        "Aruba","Afghanistan","Angola","Anguilla","Åland Islands","Albania","Andorra","United Arab Emirates","Argentina","Armenia",
        "American Samoa","Antarctica","French Southern Territories","Antigua and Barbuda","Australia","Austria",
        "Azerbaijan","Burundi","Belgium","Benin","Bonaire, Sint Eustatius and Saba","Burkina Faso","Bangladesh",
        "Bulgaria","Bahrain","Bahamas","Bosnia and Herzegovina","Saint Barthélemy","Belarus","Belize","Bermuda",
        "Bolivia, Plurinational State of","Brazil","Barbados","Brunei Darussalam","Bhutan","Bouvet Island",
        "Botswana","Central African Republic","Canada","Cocos (Keeling) Islands","Switzerland","Chile","China",
        "Côte d'Ivoire","Cameroon","Congo, the Democratic Republic of the","Congo","Cook Islands","Colombia",
        "Comoros","Cabo Verde","Costa Rica","Cuba","Curaçao","Christmas Island","Cayman Islands","Cyprus","Czech Republic",
        "Germany","Djibouti","Dominica","Denmark","Dominican Republic","Algeria","Ecuador","Egypt","Eritrea","Western Sahara",
        "Spain","Estonia","Ethiopia","Finland","Fiji","Falkland Islands (Malvinas)","France","Faroe Islands","Micronesia, Federated States of",
        "Gabon","United Kingdom","Georgia","Guernsey","Ghana","Gibraltar","Guinea","Guadeloupe","Gambia","Guinea-Bissau","Equatorial Guinea",
        "Greece","Grenada","Greenland","Guatemala","French Guiana","Guam","Guyana","Hong Kong","Heard Island and McDonald Islands",
        "Honduras","Croatia","Haiti","Hungary","Indonesia","Isle of Man","India","British Indian Ocean Territory","Ireland",
        "Iran, Islamic Republic of","Iraq","Iceland","Israel","Italy","Jamaica","Jersey","Jordan","Japan","Kazakhstan","Kenya","Kyrgyzstan",
        "Cambodia","Kiribati","Saint Kitts and Nevis","Korea, Republic of","Kuwait","Lao People's Democratic Republic","Lebanon",
        "Liberia","Libya","Saint Lucia","Liechtenstein","Sri Lanka","Lesotho","Lithuania","Luxembourg","Latvia","Macao","Saint Martin (French part)",
        "Morocco","Monaco","Moldova, Republic of","Madagascar","Maldives","Mexico","Marshall Islands","Macedonia, the former Yugoslav Republic of",
        "Mali","Malta","Myanmar","Montenegro","Mongolia","Northern Mariana Islands","Mozambique","Mauritania","Montserrat","Martinique",
        "Mauritius","Malawi","Malaysia","Mayotte","Namibia","New Caledonia","Niger","Norfolk Island","Nigeria","Nicaragua",
        "Niue","Netherlands","Norway","Nepal","Nauru","New Zealand","Oman","Pakistan","Panama","Pitcairn","Peru","Philippines",
        "Palau","Papua New Guinea","Poland","Puerto Rico","Korea, Democratic People's Republic of","Portugal","Paraguay",
        "Palestine, State of","French Polynesia","Qatar","Réunion","Romania","Russian Federation","Rwanda","Saudi Arabia","Sudan",
        "Senegal","Singapore","South Georgia and the South Sandwich Islands","Saint Helena, Ascension and Tristan da Cunha",
        "Svalbard and Jan Mayen","Solomon Islands","Sierra Leone","El Salvador","San Marino","Somalia","Saint Pierre and Miquelon",
        "Serbia","South Sudan","Sao Tome and Principe","Suriname","Slovakia","Slovenia","Sweden","Swaziland","Sint Maarten (Dutch part)",
        "Seychelles","Syrian Arab Republic","Turks and Caicos Islands","Chad","Togo","Thailand","Tajikistan","Tokelau","Turkmenistan",
        "Timor-Leste","Tonga","Trinidad and Tobago","Tunisia","Turkey","Tuvalu","Taiwan, Province of China","Tanzania, United Republic of",
        "Uganda","Ukraine","United States Minor Outlying Islands","Uruguay","United States","Uzbekistan","Holy See (Vatican City State)",
        "Saint Vincent and the Grenadines","Venezuela, Bolivarian Republic of","Virgin Islands, British","Virgin Islands, U.S.",
        "Viet Nam","Vanuatu","Wallis and Futuna","Samoa","Yemen","South Africa","Zambia","Zimbabwe"
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

    if (country == null){
        $('#countryP').text("Reported Cases of " + diseaseName);
    }
    else{
        $('#countryP').text("Reported Cases of " + diseaseName + " in " + country);
        $('#countryP').append("<br><p>from 2000 to 2014</p>");
    }


    $.ajax({url: queryURL, method: "GET"}).done(function(CDCresponse) {
        //When making an ajax call, immidiately clear out chart data
        chartStuff.emptyChart();

        console.log(CDCresponse);

        if (CDCresponse.fact.length < 1) {
            chartStuff.makeChart();

            // $('#countryStatistics').text("No " + diseaseName + " data on World Health Organization API");
        } else {
            for (i = 0; i < CDCresponse.fact.length; i++) {
                for (j = 0; j < CDCresponse.fact[i].Dim.length; j++) {
                    if (CDCresponse.fact[i].Dim[j].category == "YEAR") {

                        var year = CDCresponse.fact[i].Dim[j].code;
                        var cases = Math.round(CDCresponse.fact[i].value.display);
                        
                        console.log("Year: " + year);
                        console.log("Reported of Reported Cases: " + cases);

                        //Fill up the years and cases array
                        chartStuff.casesReported.push(cases);
                        chartStuff.yearsRecorded.push(year);                        
                    }
                }
            }
            //Once the years and cases arrays are filled up, sort them. Then draw the chart.
            chartStuff.sortCases();
            chartStuff.makeChart();

        }

        //return true
    });

}
