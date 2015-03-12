function  Itineraire(depart,arrivee, date, type) {
if(type!='')
{
	var $url = 'https://api.navitia.io/v1/coverage/fr-idf/journeys?from=stop_area:'+depart+'&to=stop_area:'+arrivee+'&datetime='+date+'&max_duration_to_pt=3000&datetime_represents='+type;
	console.log($url);
}

else
{
	var $url = 'https://api.navitia.io/v1/coverage/fr-idf/journeys?from=stop_area:'+depart+'&to=stop_area:'+arrivee+'&datetime='+date+'&max_duration_to_pt=3000';
	console.log($url);
}

 $.ajax({
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", '0da1aeae-b764-4b74-85fc-be27c8546a69' );
          },
       url : $url,
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
	if(depart !='' || arrivee != '')
	{
	console.log(depart,arrivee);
	var d = new Date();
	var date = d.toISOString();
	date= date.replace(/:/gi, "");
	date= date.replace(/z/gi, "");
	date= date.replace(/-/gi, "");
	date= date.replace(".", "");
	date = date.substring(0, 13)
	console.log(date);
	Itineraire(depart,arrivee,date,'');
	}
	
	else
		alert('veuillez renseigner correctement la station de départ et d\'arrivée');
	
	
}


function  goafter() {

	var depart = $('#depart').val();
	var arrivee = $('#arrivee').val();
	var dateTime = $('#dateTime').val()
	console.log(dateTime);
	var type = $('#type input:radio:checked').val();
	console.log(type);
	var date = $.formatDateTime('yyddmmThhii', new Date(dateTime));
	if(dateTime !='')
	{
		console.log(dateTime);
		Itineraire(depart,arrivee,date,type);
	}
	
	else
		alert('Veuillez selectionner une date');
	
	
}


function selectDate() {
var depart = $('#depart').val();
	var arrivee = $('#arrivee').val();
	if(depart !='' || arrivee != '')
	{
		$('.row').css('display','none');
		$('#plustard').css('display','block');
	}
	
	else
		alert('veuillez renseigner correctement la station de départ et d\'arrivée');

}


function secondsTominutes(secs)
{
    var hours = Math.floor(secs / (60 * 60));
   
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
 
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
   
    return minutes;
}

$(document).ready(function(){
	$('input.typeahead').typeahead({
		name: 'accounts',
		local: ['Audi', 'BMW', 'Bugatti', 'Ferrari', 'Ford', 'Lamborghini', 'Mercedes Benz', 'Porsche', 'Rolls-Royce', 'Volkswagen']
	});
}); 


