
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
	var $url = 'https://api.navitia.io/v1/coverage/fr-idf/journeys?from=stop_area:TRN:SA:DUA8768100&to=stop_area:TRN:SA:DUA8754552&datetime='+date+'&max_duration_to_pt=3000';
	//'https://api.navitia.io/v1/coverage/fr-idf/journeys?from=stop_area:'+depart+'&to=stop_area:'+arrivee+'&datetime='+date+'&max_duration_to_pt=3000';
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
		console.log(data.journeys[0].duration);
		
		
		
		$("#headerResult").append("<tr id='tab'><td>"+"d&eacute;part le : "+convertDate(data.journeys[0].departure_date_time)+" </td><td>"+"   arrivÃ© le : "+ data.journeys[0].arrival_date_time+"</td> </tr>");
		$("#headerResult").append("<tr id='tab'><td>"+"dur&eacute;e du trajet : "+"</td><td id='tdLigne'>"+secondsTominutes(data.journeys[0].duration)+" minutes</td></tr>");
		
		$.each(data.journeys[0].sections, function(i, section) {
			if(section.type == "crow_fly" && i==0)
			{ return true;}
			
		switch(section.type) {
		case "crow_fly":
		
			if (section.duration == "0")
				$("#tabR").append("<tr id='tab'>d&eacute;part : <td> d</td><td id='tdLigne'>"+section.to.name+"</td></tr");
			else
			$("#tabR").append("<tr id='tab'><td>"+"marcher jusqu'&agrave; la station"+"</td><td id='tdLigne'>"+section.to.name+"</td>");
			break;
		case "public_transport":
				$("#tabR").append("<tr><td rowspan='3'>"+afficherImage(section.display_informations.code)+"</td><td>Montez Ã  : "+section.from.name+"</td><td rowspan='3'>"+secondsTominutes(section.duration)+" min </td><tr><td> Direction : "+section.display_informations.direction+"</td></tr><tr><td> Descendez &agrave;  : "+section.to.name+"</td></tr>");
				break;
		case "waiting" :
		
			$("#tabR").append("<tr id='wait'><td colspan='3'>"+afficherImage(section.type)+"attendez : "+secondsTominutes(section.duration)+" minutes</td>");
			
		break;
		
		case "street_network" :
			if(section.mode=="walking")
			$("#tabR").append("<tr id='tab'><td>"+afficherImage(section.mode)+"</td><td>"+"marcher jusqu'&agrave; la station : "+section.to.name+"</td><td id='tdLigne'>"+secondsTominutes(section.duration)+" minutes</td>");
		case "transfer" :
			if(section.transfer_type=="walking")
				$("#tabR").append("<tr id='tab'><td>"+"marchez jusqu'&agrave; la station : "+section.to.name+"</td><td id='tdLigne'>"+secondsTominutes(section.duration)+" minutes</td>");
		default:
		$("#tabR").append("<tr id='tab'><td>Pa marche</td><td id='tdLigne'></td>");
       
}        
            });

           },
          error: function(data) {console.log("salut!")}
          });
		
        //result(data);
       }
   

   function afficherImage(NomLigne) {
   
   console.log(NomLigne);
   
  if (NomLigne=='A' || NomLigne=='B'|| NomLigne=='C' || NomLigne=='D' || NomLigne=='E' || NomLigne=='H'|| NomLigne=='J' || NomLigne=='K' || NomLigne=='L' || NomLigne=='N'|| NomLigne=='P' || NomLigne=='R' || NomLigne=='U') 
  {
                
       return  "<img id='ImageRER' src='images/RER.png' alt='RER' width='30' height='30'/><img id='ImageRER' src='images/"+NomLigne+".svg' alt='"+NomLigne+"' width='30' height='30'/>";
                       

   } 
   
   else if(NomLigne=='1' || NomLigne=='2'|| NomLigne=='3' || NomLigne=='4' || NomLigne=='5' || NomLigne=='6'|| NomLigne=='7' || NomLigne=='8' || NomLigne=='9' || NomLigne=='10'|| NomLigne=='11' || NomLigne=='12' || NomLigne=='13' || NomLigne=='14')
   {
		return  "<img id='ImageMetro' src='images/L_M.png' alt='"+NomLigne+"' width='30' height='30'/><img id='ImageMetro' src='images/M_"+NomLigne+".png' alt='"+NomLigne+"' width='30' height='30' height/>";
   }
   
   else if(NomLigne == "walking")
   {
		return  "<img id='ImageMetro' src='images/marche.png' alt='marchez' width='30' height='40'/>";
   }
   
   else if(NomLigne == "waiting")
   {
   
		"<img id='ImageMetro' src='images/attendre.png' alt='marchez' width='30' height='40'/>"
   }
   
   }
  
  
Date.prototype.yyyymmddT = function()
{
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString();
   var dd  = this.getDate().toString();
   var hh = this.getHours().toString();
   var mi=this.getMinutes().toString();
   return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0])+"T"+(hh[1]?hh:"0"+hh[0])+(mi[1]?mi:"0"+mi[0]); 
};
  
   
//Ã©vÃ©nements
$(document).ready(function(){
$( "#go" ).on('click',go);
$( "#partir" ).on('click',goafter);
$( "#next" ).on('click',selectDate);
});

function  go() {

	/*var departval = $('#depart').val();
	var arriveeval = $('#arrivee').val();
	if(departval !='' || arriveeval != '')
	{
	console.log(depart,arrivee);*/
	var d = new Date();
	var date = d.yyyymmddT();
	//var date = d.toISOString();
	/*date= date.replace(/:/gi, "");
	date= date.replace(/z/gi, "");
	date= date.replace(/-/gi, "");
	date= date.replace(".", "");
	date = date.substring(0, 13)*/
	/*console.log(date);*/
	Itineraire(depart,arrivee,date,'');
	/*}
	
	else
		alert('veuillez renseigner correctement la station de départ et d\'arrivée');*/
	
	
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
	  
   

 function convertDate(d)
{
	//var date = new Date(d);
	var yyyy = d.substring(0, 4);
	var mm = d.substring(4, 6);
	var dd = d.substring(6, 8);
	var h = d.substring(9, 11);
	var min = d.substring(11, 13);
	
	
	return dd+"/"+mm+"/"+yyyy+" "+h+":"+min;
	
	
	
} 






function result(data) {

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
    
    var minutes = Math.floor(secs / 60);
   
    return minutes;
}



$(function () {
$('#datetimepicker1').datetimepicker({
locale: 'fr',
sideBySide: true,
//collapse:false,

});
});
	
	


