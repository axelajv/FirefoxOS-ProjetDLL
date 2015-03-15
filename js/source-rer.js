// Affiche le plan du métro en fonction de la ligne renseigné
function affiche_rer(ligne){

  //On cache la barre de recherche
  //var searchBar = document.getElementById('searchBar');
  //searchBar.style.display = "none"; 

  // On récupuère la div du titre et on le modifie
  //var titre = document.getElementById('titre-ligne');
  //titre.firstChild.data = "Ligne "+ligne
  
  //On affiche le titre
  //titre.style.display = "block";

  //On récupère le lien de l'image et on le modifie
  var div_image = document.getElementById("image-rer");
  div_image.style.display = "block";

  var image = document.getElementById("image-rer2");
  image.setAttribute('src', 'images/ligne_'+ligne+'.png');

  //On affiche le bouton précédent
  //var button_return = document.getElementById('button_return');
  //button_return.style.display = "block";

}


function ligne_rer(ligne)
{
  var RER = ligne;

  if ( RER=="RER A")
  {
     affiche_rer("A");        
  }
  else if ( RER=="RER B")
  {
      affiche_rer("B");   
  }
  else if ( RER=="RER C")
  {
    affiche_rer("C"); 
  }
  else if (RER == "RER D")
  {
     affiche_rer("D");
  }
  else if (RER == "RER E")
  {
    affiche_rer("E");
  }


}


$(function() {
    var availableTags = [
      "RER A",
      "RER B",
      "RER C",
      "RER D",
      "RER E"
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
       

        var RER = ui.item.value;

        ligne_rer(RER);
        
    }

    });
  });