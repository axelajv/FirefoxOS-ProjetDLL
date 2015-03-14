
 var arrivee;
 var depart;

function  Itineraire(depart,arrivee, date, type) {
if(type!='')
{
	var $url = 'https://api.navitia.io/v1/coverage/fr-idf/journeys?from=stop_area:'+depart+'&to=stop_area:'+arrivee+'&datetime='+date+'&max_duration_to_pt=3000&datetime_represents='+type;
	console.log($url);
}

else
{
	var $url = 'https://api.navitia.io/v1/coverage/fr-idf/journeys?from=stop_area:'+depart+'&to=stop_area:'+arrivee+'&datetime='+date+'&max_duration_to_pt=3000';
	//'https://api.navitia.io/v1/coverage/fr-idf/journeys?from=stop_area:TRN:SA:DUA8768100&to=stop_area:TRN:SA:DUA8754552&datetime=20150312T2152&max_duration_to_pt=3000';
	//
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
		console.log(data);	
	
		$("#tabR").append("<tr id='tab'><td>"+"dur&eacute;e du trajet"+"</td><td id='tdLigne'>"+secondsTominutes(data.journeys[0].duration)+" minutes</td>");

		$.each(data.journeys[0].sections, function(i, section) {
			if(section.type == "crow_fly" && i==0)
			{ return true;}
			
		switch(section.type) {
		case "crow_fly":
			if (section.duration == "0")
				$("#tabR").append("<tr id='tab'>d&eacute;part : <td> d</td><td id='tdLigne'>"+section.to.name+"</td>");
			else
			$("#tabR").append("<tr id='tab'><td>"+"marcher jusqu'&agrave; la station"+"</td><td id='tdLigne'>"+section.to.name+"</td>");
			break;
		case "public_transport":
				$("#tabR").append("<tr id='tab'><td>Montez Ã  :  </td><td id='tdLigne'>"+section.from.name+"</td>");
				$("#tabR").append("<tr id='tab'><td>"+section.display_informations.network+" "+section.display_informations.code+"</td><td id='tdLigne'></td>");
				$("#tabR").append("<tr id='tab'><td> Direction : "+section.display_informations.direction+"</td><td id='tdLigne'></td>");
				$("#tabR").append("<tr id='tab'><td> jusqu'&agrave; : "+section.to.name+"</td><td id='tdLigne'></td>");
				break;
		case "waiting" :
		
			$("#tabR").append("<tr id='tab'><td>"+"attendez : "+"</td><td id='tdLigne'>"+secondsTominutes(section.duration)+" minutes</td>");
			
		break;
		default:
		$("#tabR").append("<tr id='tab'><td>a marche</td><td id='tdLigne'></td>");
       
}         
            });

           },
          error: function(data) {console.log("salut!")}
          });
		
        //result(data);
       }
       
//Ã©vÃ©nements
$(document).ready(function(){
$( "#go" ).on('click',go);
$( "#partir" ).on('click',goafter);
$( "#next" ).on('click',selectDate);
});

function  go() {

	var departval = $('#depart').val();
	var arriveeval = $('#arrivee').val();
	if(departval !='' || arriveeval != '')
	{
	console.log(depart,arrivee);
	var d = new Date();
	var date = d.toISOString();
	date= date.replace(/:/gi, "");
	date= date.replace(/z/gi, "");
	date= date.replace(/-/gi, "");
	date= date.replace(".", "");
	date = date.substring(0, 13)
	/*console.log(date);*/
	Itineraire(depart,arrivee,date,'');
	}
	
	else
		alert('veuillez renseigner correctement la station de départ et d\'arrivée');
	
	
}


function setArrivee(val,text)
{
 
  arrivee=text;
  console.log(text);
  
}

function setDepart(val,text)
{
 
  depart=text;
  console.log(text);
  
}


  $(function() {



    $.ajax({
    dataType: "json",
    url: "json/StationNavitia.json",
    mimeType: "application/json",
	success: function(donnees) {
		$('#arrivee').typeahead({
        source: donnees,
        display: 'label',
        val: 'id',
		itemSelected : setArrivee
	});
	
        $('#depart').typeahead({
        source: donnees,
        display: 'label',
        val: 'id', 
		itemSelected : setDepart	
    });
	
	}

 });



  });
	  
    






function result(data) {

$.each(data.section, function(i, item) {
	
    alert(data.sections[i].mode);
});

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



/*var dataTest;
$.ajax({
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", '0da1aeae-b764-4b74-85fc-be27c8546a69' );
          },
       url : 'https://api.navitia.io/v1/coverage/fr-idf/stop_areas',
       type : 'GET',
       dataType : 'json',
       success : function(data){ 
		dataTest = data;
        console.log(data);
       },
       error : function(){
          console.log('merde');

       }

    });
	*/
	
	
	$(function () {
	   $('#demo1').typeahead({
        source: [
            { id: 1, name: 'Toronto' },
            { id: 2, name: 'Montreal' },
            { id: 3, name: 'New York' },
            { id: 4, name: 'Buffalo' },
            { id: 5, name: 'Boston' },
            { id: 6, name: 'Columbus' },
            { id: 7, name: 'Dallas' },
            { id: 8, name: 'Vancouver' },
            { id: 9, name: 'Seattle' },
            { id: 10, name: 'Los Angeles'}
        ]
    });
	});

