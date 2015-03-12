
	function Afficher() {
				$(".leaflet-routing-container").toggle();
				$(".leaflet-routing-container").css('margin-top',50);
		
	}

	
	
	var map = L.map('map').setView([48.628105, 2.442202], 13);
	
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

//		map.on('accuratepositionprogress', onAccuratePositionProgress);
		map.on('accuratepositionfound', onAccuratePositionFound);


	map.findAccuratePosition({
		maxWait: 10000,
	    desiredAccuracy: 20
	});	
   
  
		
	function onAccuratePositionFound (e) {
			var Origine = e.latlng
			var Min=0;
			var LongitudeMin;
			var LatitudeMin;
			var i=0;
			var Nom="";

			

			L.marker(e.latlng).addTo(map).bindPopup('Erreur de la recherche :( ').openPopup();

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


				
			    L.Routing.control({
					waypoints: [
						e.latlng,
						L.latLng(48.628105, 2.442202)
						//LatitudeMin, LongitudeMin)
					],
					routeWhileDragging: true,
					language:'fr'
		
				
				}).addTo(map);

			
				//	$('#titre').append('<h1> '+ Nom +' </h1>');
				 	
			  });
			  
			 
			
			document.getElementById("chargement").id = "finchargement";

		}
