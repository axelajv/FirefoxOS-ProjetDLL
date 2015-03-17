

$(document).ready(function(){
          $("input").click(function(){
              $("#footer").css("display", "none").fadeOut(2000);
          });
          $("input").blur(function(){
              $("#footer").css("display", "block");
          });
      });  
  
  $(function() {



    $.getJSON('json/StationNavitia.json', function(donnees) {
      

    $("#gareD").autocomplete({
      source: donnees, 
      minLength : 1,
     
      select: function(event, ui) {
          
       var IdStation=ui.item.id;
       nav(IdStation);

      }
    });

 });


  });



Date.prototype.yyyymmddT = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   var hh = this.getHours().toString();
   var mi=this.getMinutes().toString();
   return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0])+"T"+(hh[1]?hh:"0"+hh[0])+(mi[1]?mi:"0"+mi[0]); // 20150315T0900
};

function HeureM(date){

  var result=date.substr(9,4);
  var heure=result.substr(0,2);
  var min=result.substr(2,2);
  result=heure+":"+min;
  return result;
}



function nav(IdStation){

  
    
    d = new Date();
     
     var maintenant= d.yyyymmddT();


     var MyURL ='https://api.navitia.io/v1/coverage/fr-idf/stop_areas/stop_area:'+IdStation+'/departures?from_datetime='+maintenant+'&duration=1800';
   
     $.ajax({
        beforeSend: function(request) {
        request.setRequestHeader("Authorization", '0da1aeae-b764-4b74-85fc-be27c8546a69' );
          },
          
          dataType: "json",
          url: MyURL,
          success: function(data) {
            // data is an array of objects and must be transformed for autocomplete to use
            console.log(data);
                 $("#tabR").empty();
          //  var NomTrain =data.departures[0].route.direction.stop_point.name;
          //  var NomLigne =data.departures[0].route.line.code;
          //  var ListeStation=data.departures[0].route.line.name;
           // var DateDepart=data.departures[0].stop_date_time.departure_date_time;

            $.each(data.departures, function(i, dep) {

              var heure=HeureM(dep.stop_date_time.departure_date_time);
              var NomLigne =dep.route.line.code;

            if (NomLigne=='A' || NomLigne=='B'|| NomLigne=='C' || NomLigne=='D' || NomLigne=='E' || NomLigne=='H'|| NomLigne=='J' || NomLigne=='K' || NomLigne=='L' || NomLigne=='N'|| NomLigne=='P' || NomLigne=='R' || NomLigne=='U') {
                
             
                 $("#tabR").append("<tr id='tab'><td id='tdHeure'>"+heure+"</td><td id='tdLigne'><img id='ImageRER' src='images/"+dep.route.line.code+".svg' alt='"+dep.route.line.code+"'/></td><td id='tdNom'>"+dep.route.direction.stop_point.name+"</td><td id='tdListe'>"+dep.route.line.name+"</td></tr>");
                       

            } else {

                  $("#tabR").append("<tr id='tab'><td id='tdHeure'>"+heure+"</td><td id='tdLigne'>"+dep.route.line.code+"</td><td id='tdNom'>"+dep.route.direction.stop_point.name+"</td><td id='tdListe'>"+dep.route.line.name+"</td></tr>");
                       
            }

          
            });

           // alert(DateDepart+'-----'+NomTrain+'-----'+NomLigne+'-----'+ListeStation);

          },
          error: function(data) {console.log("salut!")}
          });
}
