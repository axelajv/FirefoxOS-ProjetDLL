var options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};




function success(pos) {

var Gare = L.icon({
    iconUrl: 'images/logo2.png',
    iconRetinaUrl: 'images/logo2.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, 0]
});

var Personne = L.icon({
    iconUrl: 'images/logo2.png',
    iconRetinaUrl: 'images/logo2.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, 0]
});

  var crd = pos.coords;
  var Origine = L.latLng(crd.latitude, crd.longitude);
  var Min=0;
  var LongitudeMin;
  var LatitudeMin;
  var i=0;
   var Nom="";

 

	var map = L.map('map',
			{
				center: Origine,
				zoom: 14, 
				doubleClickZoom : false,
				boxZoom : false,
				keyboard: false,
				minZoom: 3
			});


	
	
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);


			L.marker(Origine).addTo(map).bindPopup('Vous êtes ici').openPopup();

			  $.getJSON('json/Station.json', function(donnees) {
				$.each( donnees, function( key, val ) {
				
					var Cible = L.latLng(val.Latitude,val.Longitude);
					var Distance=Origine.distanceTo(Cible);
				
					if (Distance < Min || i==0) {
						i=1;
						Min=Distance;
						LongitudeMin=val.Longitude;
						LatitudeMin=val.Latitude;
				
						Nom=val.Nom;
					
					}
				});

		var GareOne=L.latLng(LatitudeMin, LongitudeMin);

		L.marker(GareOne).addTo(map).bindPopup(Nom).openPopup();

	
		var pointList = [Origine, GareOne];

		var Polyline = new L.Polyline(pointList, {
		color: 'red',
		weight: 3,
		//opacity: 0.5,
		smoothFactor: 1

		});

		Polyline.addTo(map);


		
			
				$('#titre').append('<h3> '+ Nom +' </h3>');
				 	
			  });
			  
			 
			
			document.getElementById("chargement").id = "finchargement";


	map.findAccuratePosition({
		maxWait: 10000,
	    desiredAccuracy: 20
	});	




};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error, options);
  