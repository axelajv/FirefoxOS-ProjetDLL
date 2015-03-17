
 var arrivee;
 var depart;
 var departText;
 var arriveeText;
// Calcul de l'itinéraire
function  Itineraire(depart,arrivee, date, type, url) {
if(type!='' && url=='')
{
	var $MyUrl = 'https://api.navitia.io/v1/coverage/fr-idf/journeys?from=stop_area:'+depart+'&to=stop_area:'+arrivee+'&datetime='+date+'&max_duration_to_pt=3000&datetime_represents='+type;
	//console.log($url);
}

else if(type=='' && url=='')
{
	var $MyUrl = 'https://api.navitia.io/v1/coverage/fr-idf/journeys?from=stop_area:'+depart+'&to=stop_area:'+arrivee+'&datetime='+date+'&max_duration_to_pt=3000';
	//'https://api.navitia.io/v1/coverage/fr-idf/journeys?from=stop_area:TRN:SA:DUA8768100&to=stop_area:TRN:SA:DUA8754552&datetime='+date+'&max_duration_to_pt=3000';
	
	//
	console.log($MyUrl);
}

else if(url !='')
	$MyUrl = url;


 $.ajax({
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", '0da1aeae-b764-4b74-85fc-be27c8546a69' );
          },
       url : $MyUrl,
       type : 'GET',
       dataType : 'json',
       success : function(data){ 
	   
		$('#result').css('display','block');
		$('#form').css('display','none');
		
		//on vide les champs départ et arrivee et date
		$('#depart').val("");
		$('#arrivee').val("");
		$('#dateTime').empty();
		
		console.log(data);	
		console.log(data.journeys[0].duration);
		
		// Resultat
		if(data.journeys.length>0) {
		
		$("#headerResult").append("<tr><td><b>D&eacute;part le : &nbsp;&nbsp;</b> </td><td><b> &nbsp;  Arrivé le : </b></td> </tr>");
		$("#headerResult").append("<tr><td>"+convertDate(data.journeys[0].departure_date_time)+"&nbsp;&nbsp; </td><td> &nbsp;"+convertDate(data.journeys[0].arrival_date_time)+"</td> </tr>");
		$("#headerResult").append("<tr><td>"+"<b>Dur&eacute;e du trajet : </b>"+"&nbsp;"+secondsTominutes(data.journeys[0].duration)+" min  </td></tr>");
		
		
		
		$("#from").append("<b>Départ : </b>" + data.journeys[0].sections[0].from.name);
		$("#to").append("<b>Arrivé : </b>" + data.journeys[0].sections[data.journeys[0].sections.length-1].to.name);
		
		$.each(data.journeys[0].sections, function(i, section) {
			if(section.type == "crow_fly" && i==0)
			{ return true;}
			
			
			
		switch(section.type) {
		case "crow_fly":
		
			/*if (section.duration == "0")
				$("#tabR").append("<tr id='tab1'> départ : <td> d</td><td>"+section.to.name+"</td></tr");
			else
			$("#tabR").append("<tr id='tab2'><td>"+"marcher jusqu'&agrave; la station"+"</td><td id='tdLigne'>"+section.to.name+"</td>");*/
			break;
		case "public_transport":
				if(section.display_informations.commercial_mode=='Bus')
				{
					$("#tabR").append("<tr><td rowspan='3'>"+afficherImage(section.display_informations.commercial_mode)+" "+ section.display_informations.code +"</td><td><b>Montez à : </b>"+section.from.name+"</td><td rowspan='3'>"+secondsTominutes(section.duration)+" min </td><tr><td> Direction : "+section.display_informations.direction+"</td></tr><tr><td> Descendez &agrave;  : "+section.to.name+"</td></tr>");
				}
				else
				$("#tabR").append("<tr><td rowspan='3'>"+afficherImage(section.display_informations.code)+"</td><td><b>Montez à : </b>"+section.from.name+"</td><td rowspan='3'>"+secondsTominutes(section.duration)+" min </td><tr><td> <b>Direction :</b> "+section.display_informations.direction+"</td></tr><tr><td><b> Descendez &agrave;  : </b>"+section.to.name+"</td></tr>");
				break;
				
		case "waiting" :
		
			$("#tabR").append("<tr id='wait'><td colspan='3'>"+afficherImage(section.type)+" &nbsp;&nbsp;&nbsp; Attendez &nbsp;&nbsp;&nbsp; "+secondsTominutes(section.duration)+" min</td>");
			
		break;
		
		case "street_network" :
			if(section.mode=="walking")
			$("#tabR").append("<tr id='tab3'><td>"+afficherImage(section.mode)+"</td><td>"+"<b>marcher jusqu'&agrave; la station :</b>"+section.to.name+"</td><td id='tdLigne'>"+secondsTominutes(section.duration)+" min</td>");
		case "transfer" :
			if(section.transfer_type=="walking")
			$("#tabR").append("<tr id='wait'><td colspan='3'>"+afficherImage(section.type)+" &nbsp;&nbsp; changement de ligne  :  "+secondsTominutes(section.duration)+" min</td>");
		
       
}        
            });
			
			$("#hiddenNext").val( data.links[0].href);
			$("#hiddenPrevious").val(data.links[1].href);
			
			}
			else
			$("#tabR").append("<p> Une erreur est survenue  : " /*+data.errors[]*/+"</p>");

           },
          error: function(statut) {
		  console.log(statut);
		  $('#result').css('display','block');
		$('#form').css('display','none');
		  $("#tabR").append("<p> Une erreur est survenue  : Aucun résultat n'a été trouvé " /*+data.errors[]*/+"</p>");
		  console.log("salut!")}
          });
		
        //result(data);
       }
   
// gestion des images pour l'affichage des résultats
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
		return  "<img id='ImageMetro' src='images/marche.png' alt='marchez' width='25' height='42'/>";
   }
   
   else if(NomLigne == "waiting")
   {
   
		return "<img id='Imagewait' src='images/wait.png' alt='marchez' width='25' height='30'/>"
   }
   
   else if(NomLigne=='Bus')
   {
		return "<img id='Imagewait' src='images/bus.png' alt='marchez' width='30' height='30'/>"
   }
   
   else if(NomLigne=="transfer")
   {
		return "<img id='Imagewait' src='images/transfert.png' alt='marchez' width='30' height='30'/>"
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
  
   
//événements
$(document).ready(function(){
$( "#go" ).on('click',go);
$( "#partir" ).on('click',goafter);
$( "#next" ).on('click',selectDate);
$( "#resultNext" ).on('click',resultNext);
$( "#resultPrevious" ).on('click',resultPrevious);
//$("#favoris").on('click',favoris);

$( "#newtineraire" ).on('click',newtineraire);
$( "#newItineraireFooter" ).on('click',newtineraire);


$('#depart').click(function(){
   $("#footerDisplay").css("display", "none").fadeOut(2000);
       });
$("#depart").blur(function(){
   $("#footerDisplay").css("display", "block");
          });

$('#arrivee').click(function(){
   $("#footerDisplay").css("display", "none").fadeOut(2000);
       });
$("#arrivee").blur(function(){
   $("#footerDisplay").css("display", "block");
          });



	  
	  



var dateMin = new Date();
dateMin.setDate(dateMin.getDate() -1);
var dateMax = new Date();
dateMax.setDate(dateMax.getMonth() +1);
dateMin = $.formatDateTime('dd-mm-yy hh:ii', dateMin);
dateMax = $.formatDateTime('dd-mm-yy hh:ii', dateMax);

$("#dtBox").DateTimePicker({
		//minDateTime: dateMin,
		//maxDateTime: dateMax,
		formatHumanDate: function(date)
					{
						return date.dayShort + ", " + date.dd + " " + date.month+ ", " + date.yyyy;
					}
				
});

});


/*a finir
function favoris(){
//Save it in local storage and stay there

if (window.localStorage) {
//localtorage.setItem(depart,departText);
//localStorage.setItem(arrivee,arriveeText);
console.log('salut'arrivee);
var url = 'https://api.navitia.io/v1/coverage/fr-idf/journeys?from=stop_area:'+depart+'&to=stop_area:'+arrivee+'&datetime='+date+'&max_duration_to_pt=3000;
localStorage.setItem('url',url);
}

}

 $(function() {
 
 	for (i=0; i<=localStorage.length-1; i++)
{ 
 
key = localStorage.key(i);
val = localStorage.getItem(key); 
}
 
 });*/


function newtineraire() 
{
	
	$('#tabR').empty();
	$("#from").empty();
	$("#to").empty();
	$("#headerResult").empty();
	$('#dateTime').empty();
	$('#depart').val("");
	$('#arrivee').val("");
	$('#result').css('display','none');
	$('#form').css('display','block');
	$('#plustard').css('display','none');
	
	$('#firstpart').css('display','block');
}

function resultNext() 
{
	$('#headerResult').empty();
	$('#tabR').empty();
	$("#from").empty();
	$("#to").empty();
	url = $("#hiddenNext").val();
	Itineraire('','','','',url);;
}

function resultPrevious() 
{
	$('#headerResult').empty();
	$('#tabR').empty();
	$("#from").empty();
	$("#to").empty();
	url = $("#hiddenPrevious").val();
	Itineraire('','','','',url);
}


function  go() {

	departText = $('#depart').val();
	arriveeText = $('#arrivee').val();
	if(departText !='' || arriveeText != '')
	{
	console.log(depart,arrivee);
	var d = new Date();
	var date = d.yyyymmddT();
	Itineraire(depart,arrivee,date,'','');
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

 function convertDatetoUTC(d)
{
	//var date = new Date(d);
	var dd = d.substring(0, 2);
	var mm = d.substring(3, 5);
	var yyyy = d.substring(6, 10);
	var h = d.substring(11, 13);
	var min = d.substring(14, 16);
	
	
	return yyyy+""+mm+""+dd+"T"+h+""+min;
	
} 




function result(data) {

}


function  goafter() {

	var departa = $('#depart').val();
	var arriveea = $('#arrivee').val();
	var dateTime = $('#dateTime').val();
	var type = $('#type input:radio:checked').val();
	console.log(type);
	//var date = $.formatDateTime('yyddmmThhii', new Date(dateTime));
	//console.log($.formatDateTime('yyddmmThhii', new Date(dateTime)));
	if(dateTime !='')
	{
		dateTime = convertDatetoUTC(dateTime);
		console.log(dateTime);
		console.log(dateTime);
		Itineraire(depart,arrivee,dateTime,type,'','');
	}
	
	else
		alert('Veuillez selectionner une date');
	
}


function selectDate() {
var depart = $('#depart').val();
	var arrivee = $('#arrivee').val();
	if(depart !='' || arrivee != '')
	{
		$('#firstpart').css('display','none');
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



/*$(function () {
$('#datetimepicker1').datetimepicker({
locale: 'fr',
sideBySide: true,
collapse:false,

});
});*/
	
	


