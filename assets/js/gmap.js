var globalLong, globalLat, globalCountry;
var proceed = false;

var mapDiv = document.getElementById('googleMap');

function codeAddress() {
    var geocoder = new google.maps.Geocoder();
    var address = document.getElementById('address').value;
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            
            var country = results[0].address_components[results[0].address_components.length - 1].long_name;
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            document.getElementById('latitude').value = latitude;
            document.getElementById('longitude').value = longitude;

            globalLat = latitude;
            globalLong = longitude;
            globalCountry = country;
            proceed = true;

            myFunctionTest(globalLat,globalLong);
            callAjax(globalCountry);
            NYTcall(globalCountry);

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function myFunctionTest(x,y){

    if(proceed){
    //console.log(globalLat,globalLong);

        var myCenter = new google.maps.LatLng(globalLat, globalLong);
            var mapProp = {
            center: myCenter,
            zoom: 12,
            scrollwheel: false,
            draggable: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById('googleMap'), mapProp);

        var marker = new google.maps.Marker({
            position: myCenter,
        });
        marker.setMap(map);

    }else{
        console.log('No location found!');
    }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////

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
    	var chartDiv = $('#myChart');

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
                            labelString:'Number of Reported Cases',
                        },                                           
    	                ticks: {
    	                    beginAtZero:true
    	                },
    	            }],
                    xAxes: [{
                        gridLines:{
                            display:false,
                            drawBorder:true,
                            label:'good',
                        },
                        scaleLabel:{
                            display:true,
                            labelString:'Year',
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

//////////////////////////////////////////////////////////////////////////////////////////////////////

//WHO API Call

function callAjax(country) {
//Passing in the country from the Google Maps geocoder information

	//Creating two arrays to check the country name and the corresponding 3 letter country code
    var countryAbb = [
        'ABW','AFG','AGO','AIA','ALA','ALB','AND','ARE','ARG','ARM','ASM','ATA','ATF','ATG','AUS','AUT','AZE',
        'BDI','BEL','BEN','BES','BFA','BGD','BGR','BHR','BHS','BIH','BLM','BLR','BLZ','BMU','BOL','BRA','BRB','BRN','BTN','BVT','BWA',
        'CAF','CAN','CCK','CHE','CHL','CHN','CIV','CMR','COD','COG','COK','COL','COM','CPV','CRI','CUB','CUW','CXR','CYM','CYP','CZE',
        'DEU','DJI','DMA','DNK','DOM','DZA','ECU','EGY','ERI','ESH','ESP','EST','ETH','FIN','FJI','FLK','FRA','FRO','FSM',
        'GAB','GBR','GEO','GGY','GHA','GIB','GIN','GLP','GMB','GNB','GNQ','GRC','GRD','GRL','GTM','GUF','GUM','GUY',
        'HKG','HMD','HND','HRV','HTI','HUN','IDN','IMN','IND','IOT','IRL','IRN','IRQ','ISL','ISR','ITA','JAM','JEY','JOR','JPN',
        'KAZ','KEN','KGZ','KHM','KIR','KNA','KOR','KWT','LAO','LBN','LBR','LBY','LCA','LIE','LKA','LSO','LTU','LUX','LVA',
        'MAC','MAF','MAR','MCO','MDA','MDG','MDV','MEX','MHL','MKD','MLI','MLT','MMR','MNE','MNG','MNP','MOZ','MRT','MSR','MTQ','MUS','MWI','MYS','MYT','NAM',
        'NCL','NER','NFK','NGA','NIC','NIU','NLD','NOR','NPL','NRU','NZL','OMN','PAK','PAN','PCN','PER','PHL','PLW','PNG','POL','PRI','PRK','PRT','PRY','PSE','PYF',
        'QAT','REU','ROU','RUS','RWA','SAU','SDN','SEN','SGP','SGS','SHN','SJM','SLB','SLE','SLV','SMR','SOM','SPM','SRB','SSD','STP','SUR','SVK','SVN','SWE','SWZ','SXM','SYC','SYR',
        'TCA','TCD','TGO','THA','TJK','TKL','TKM','TLS','TON','TTO','TUN','TUR','TUV','TWN','TZA',
        'UGA','UKR','UMI','URY','USA','UZB','VAT','VCT','VEN','VGB','VIR','VNM','VUT','WLF','WSM','YEM','ZAF','ZMB','ZWE'
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

    //Using a for loop to search through the above arrays and determine the three letter country code for the address searched
    for (i = 0; i < countryAbb.length; i++) {
        if (country == countryName[i]) {
            abb = countryAbb[i];
        }
        else {
            //console.log('not Match');
        };
    };

    //Grab the value of the disease selected by user
    var infectiousDisease = $('#diseaseSelect').val();

    //console.log(infectiousDisease);

    //adding the value of the disease selected and the country 3 letter abbreviation code to the API query
    var queryURL = 'http://apps.who.int/gho/athena/api/GHO/' + infectiousDisease + '?filter=COUNTRY:' + abb + '&format=json';

    //console.log(queryURL);

    //Grabbing the disease name which is stored as data-disease
    var disease = document.getElementById('diseaseSelect');
    var selectedOption = disease.options[disease.selectedIndex];
    var diseaseName = selectedOption.getAttribute('data-disease');
    //console.log(diseaseName);

    //if-else statement where we display the Country and Disease name when available
    if (country == null){
        $('#countryP').text('Reported Cases of ' + diseaseName);
    }
    else{
        $('#countryP').text('Reported Cases of ' + diseaseName + ' in ' + country);
        $('#countryP').append('<br><p>from 2000 to 2014</p>');
    };

    //AJAX call to WHO API
    $.ajax({url: queryURL, method: 'GET'}).done(function(CDCresponse) {
        
        //When making an ajax call, immidiately clear out chart data
        chartStuff.emptyChart();

        //console.log(CDCresponse);

        if (CDCresponse.fact.length < 1) {
        	//create a blank chart if no available WHO data
            chartStuff.makeChart();
        } else {
        	//create a data chart using chartJS library using year and number of cases reported from WHO API
            for (i = 0; i < CDCresponse.fact.length; i++) {
                for (j = 0; j < CDCresponse.fact[i].Dim.length; j++) {
                    if (CDCresponse.fact[i].Dim[j].category == 'YEAR') {

                        var year = CDCresponse.fact[i].Dim[j].code;
                        var cases = Math.round(CDCresponse.fact[i].value.display);
                        
                        //console.log('Year: ' + year);
                        //console.log('Reported of Reported Cases: ' + cases);

                        //Fill up the years and cases array
                        chartStuff.casesReported.push(cases);
                        chartStuff.yearsRecorded.push(year);                        
                    };
                };
            };
            //Once the years and cases arrays are filled up, sort them. Then draw the chart.
            chartStuff.sortCases();
            chartStuff.makeChart();
        };
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////

//NYT API Call

function NYTcall(country) {

	//get the current date
    var currentDate = moment();

    //console.log(currentDate);

    //create a searchDate filter used in the API that searches within the last 6 months from the current date
    var searchDate = currentDate.subtract(6, 'months');
    searchDate = moment(searchDate).format('YYYYMMDD');
    //console.log(searchDate);

    var authKey = 'b9f91d369ff59547cd47b931d8cbc56b:0:74623931'; 

    //get the country name replacing spaces with + signs for use on the NYT API
    var countryNoSpace = country.split(' ').join('+');
    //console.log(countryNoSpace);

    //creating the queryURL
    var NYTqueryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' + authKey + '&sort=newest&page=0&begin_date=' + searchDate + '&q=disease+outbreak+' + countryNoSpace;

    console.log(NYTqueryURL);

    $.ajax({url: NYTqueryURL, method: 'GET'}).done(function(NYTresponse) {

    	$('#countryArticles').empty();
    	//console.log(NYTresponse);

    	//if-else statement to check if there are any articles
    	if (NYTresponse.response.docs.length < 1) {
    		//if there are no articles, let user's know
    		var pItem = $('<p>');
    		pItem.text('There are no articles found on the New York Times within the last 6 months');
    		$('#countryArticles').append(pItem);
    	} else {
    		//if articles exist, use a for loop to display the first 5 article headlines and their URLs
	        for (i = 0; i < 5; i++) {

	        	//console.log(NYTresponse.response.docs[i].headline.main);

	            var pItem = $('<p>');
	            var pLink = $('<a>');
	            pLink.attr('href', NYTresponse.response.docs[i].web_url);
	            pLink.text(NYTresponse.response.docs[i].headline.main);
	            pItem.append(pLink);

	            //listItem.text(NYTresponse.response.docs[i].headline.main);
	            $('#countryArticles').append(pItem);
	        };
    	};
    });
};