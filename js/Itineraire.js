function  Itineraire(depart,arrivee, date) {
 $.ajax({
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", '0da1aeae-b764-4b74-85fc-be27c8546a69' );
          },
       url : 'https://api.navitia.io/v1/coverage/fr-idf/journeys?from=stop_area:'+depart+'&to=stop_area:'+arrivee+'&datetime='+date+'&max_duration_to_pt=3000',
       type : 'GET',
       dataType : 'json',
       success : function(data){ 
		$('#result').css('display','block');
		$('#form').css('display','none');
        console.log(data.journeys[0]);
       },
       error : function(){
          console.log('merde');

       }

    });

  
}


function  go() {

	var depart = $('#depart').val();
	var arrivee = $('#arrivee').val();
	console.log(depart,arrivee);
	var d = new Date();
	var date = d.toISOString();
	date= date.replace(/:/gi, "");
	date= date.replace(/z/gi, "");
	date= date.replace(/-/gi, "");
	date= date.replace(".", "");
	date = date.substring(0, 13)
	console.log(date);
	Itineraire(depart,arrivee,date);
}


function secondsTominutes(secs)
{
    var hours = Math.floor(secs / (60 * 60));
   
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
 
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
   
    
       
       
    };
    return minutes;
}