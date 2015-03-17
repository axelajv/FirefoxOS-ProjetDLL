$(document).ready(function(){
          $("input").click(function(){
              $("#footer").css("display", "none").fadeOut(2000);
          });
          $("input").blur(function(){
              $("#footer").css("display", "block");
          });

      });



// Affiche le plan du métro en fonction de la ligne renseigné
function affiche_metro(ligne){

  //On cache la barre de recherche
  //var searchBar = document.getElementById('searchBar');
  //searchBar.style.display = "none"; 

  // On récupuère la div du titre et on le modifie
  //var titre = document.getElementById('titre-ligne');
  //titre.firstChild.data = "Ligne "+ligne
  
  //On affiche le titre
  //titre.style.display = "block";

  //On récupère le lien de l'image et on le modifie
  var div_image = document.getElementById("image-metro");
  div_image.style.display = "block";

  var image = document.getElementById("image-metro2");
  image.setAttribute('src', 'images/metro-ligne-'+ligne+'.gif');

  //On affiche le bouton précédent
  //var button_return = document.getElementById('button_return');
  //button_return.style.display = "block";
}

function hide_footer(){

  var footer = document.getElementById("footer");
  footer.style.display = "none";
}

function show_footer(){
  var footer = document.getElementById("footer");
  footer.style.display = "block";

}





function ligne_metro(ligne){

  var metro = ligne;

  if ( metro=="Metro 1")
        {
          affiche_metro(1);        
        }
        else if ( metro=="Metro 2")
        {
          affiche_metro(2);
          
        }
        else if ( metro=="Metro 3")
        {
          affiche_metro(3); 
        }
        else if ( metro=="Metro 4")
        {
          affiche_metro(4);
        }
        else if ( metro=="Metro 5")
        {
          affiche_metro(5);
        }
        else if ( metro=="Metro 6")
        {
          affiche_metro(6);
        }
        else if ( metro=="Metro 7")
        {
         affiche_metro(7); 
        }
        else if ( metro=="Metro 8")
        {
         affiche_metro(8); 
        }
        else if ( metro=="Metro 9")
        {
         affiche_metro(9); 
        }
        else if ( metro=="Metro 10")
        {
         affiche_metro(10); 
        }
        else if ( metro=="Metro 11")
        {
         affiche_metro(11); 
        }
        else if ( metro=="Metro 12")
        {
         affiche_metro(12); 
        }
        else if ( metro=="Metro 13")
        {
         affiche_metro(13); 
        }
        else if ( metro=="Metro 14")
        {
         affiche_metro(14); 
        }

}

$(function() {
    var availableTags = [
      "Metro 1",
      "Metro 2",
      "Metro 3",
      "Metro 4",
      "Metro 5",
      "Metro 6",
      "Metro 7",
      "Metro 8",
      "Metro 9",
      "Metro 10",
      "Metro 11",
      "Metro 12",
      "Metro 13",
      "Metro 14"
    ];
    $( "#autocomplete" ).autocomplete({
      delay: 100,

      source: availableTags,

      messages: {
        noResults: '',
        results: function() {}
    },

    select : function(event, ui){

        // prevent autocomplete from updating the textbox
        event.preventDefault();
       

        var metro = ui.item.value;

        ligne_metro(metro);
        
    }

    });
  });