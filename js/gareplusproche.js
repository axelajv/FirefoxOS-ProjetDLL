var options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};




function success(pos) {

var TrainR = L.icon({
    iconUrl: 'images/TrainR.png',
    iconRetinaUrl: 'images/TrainR.png',
    iconSize: [30, 50],
    iconAnchor: [15, 50],
    popupAnchor: [0, 0]
});



var TrainO = L.icon({
    iconUrl: 'images/TrainO.png',
    iconRetinaUrl: 'images/TrainO.png',
    iconSize: [30, 50],
    iconAnchor: [15, 50],
    popupAnchor: [0, 0]
});


var TrainV = L.icon({
    iconUrl: 'images/TrainV.png',
    iconRetinaUrl: 'images/TrainV.png',
    iconSize: [30, 50],
    iconAnchor: [15, 50],
    popupAnchor: [0, 0]
});




var Personne = L.icon({
    iconUrl: 'images/logo2.png',
    iconRetinaUrl: 'images/Personne.png',
    iconSize: [35, 50],
    iconAnchor: [15, 50],
    popupAnchor: [0, 0]
});

  var crd = pos.coords;
  var Origine = L.latLng(crd.latitude, crd.longitude);
  var Min=0;
  var LongitudeMin;
  var LatitudeMin;
  var LongitudeMin2;
  var LatitudeMin2;
  var LongitudeMin3;
  var LatitudeMin3;
  var i=0;
  var Nom="";
  var Nom2="";
  var Nom3="";

 

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


			L.marker(Origine, {icon: Personne}).addTo(map).bindPopup('Vous êtes ici').openPopup();

		

		 $.getJSON('json/Station.json', function(donnees) {
				$.each( donnees, function( key, val ) {
				
					var Cible = L.latLng(val.Latitude,val.Longitude);
					var Distance=Origine.distanceTo(Cible);

					//alert(val.Nom);
				
					if (Distance < Min || i==0) {
						
						i=1;

						Min=Distance;

						LongitudeMin3=LongitudeMin2;
						LongitudeMin2=LongitudeMin;
						LongitudeMin=val.Longitude;

						LatitudeMin3=LatitudeMin2;
						LatitudeMin2=LatitudeMin;
						LatitudeMin=val.Latitude;

						Nom3=Nom2;
						Nom2=Nom;
						Nom=val.Nom;

						//alert(val.Nom);
					
					}
				});

	

		var GareTrois=L.latLng(LatitudeMin3, LongitudeMin3);
		L.marker(GareTrois,{icon: TrainR}).addTo(map).bindPopup(Nom3).openPopup();

		var GareDeux=L.latLng(LatitudeMin2, LongitudeMin2);
		L.marker(GareDeux,{icon: TrainO}).addTo(map).bindPopup(Nom2).openPopup();

		var GareOne=L.latLng(LatitudeMin, LongitudeMin);
		L.marker(GareOne,{icon: TrainV}).addTo(map).bindPopup(Nom).openPopup();

	
		var pointList = [Origine, GareOne];
		var pointListDeux = [Origine, GareDeux];
		var pointListTrois = [Origine, GareTrois];


		var Polyline = new L.Polyline(pointList, {
		color: 'green',
		weight: 3,
		smoothFactor: 1

		});

		var Polyline2 = new L.Polyline(pointListDeux, {
		color: 'Orange',
		weight: 3,
		smoothFactor: 1

		});


		var Polyline3 = new L.Polyline(pointListTrois, {
		color: 'red',
		weight: 3,
		smoothFactor: 1

		});

		Polyline.addTo(map);
		Polyline2.addTo(map);
		Polyline3.addTo(map);


			
				$('#titre').append('<a class="navbar-brand" href="index.html"><p><img src="images/logo2.png" class="logoappli" /> '+ Nom +' </p></a>');
				 	
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
  