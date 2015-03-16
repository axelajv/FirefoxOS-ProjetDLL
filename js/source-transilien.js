// Affiche le plan du métro en fonction de la ligne renseigné
function affiche_transilien(ligne){

  //On cache la barre de recherche
  //var searchBar = document.getElementById('searchBar');
  //searchBar.style.display = "none"; 

  // On récupuère la div du titre et on le modifie
  //var titre = document.getElementById('titre-ligne');
  //titre.firstChild.data = "Ligne "+ligne
  
  //On affiche le titre
  //titre.style.display = "block";

  //On récupère le lien de l'image et on le modifie
  var div_image = document.getElementById("image-transilien");
  div_image.style.display = "block";

  var image = document.getElementById("image-transilien2");
  image.setAttribute('src', 'images/ligne_'+ligne+'.png');

  //On affiche le bouton précédent
  //var button_return = document.getElementById('button_return');
  //button_return.style.display = "block";
}


function ligne_transilien(ligne){

  var transilien = ligne;

  if ( transilien=="Ligne A")
    {
      affiche_transilien("A");        
    }
  else if ( transilien=="Ligne B" )
    {
      affiche_transilien("B");   
    }
  else if ( transilien=="Ligne C" )
    {
      affiche_transilien("C");   
    }      
  else if ( transilien=="Ligne D" )
      {
        affiche_transilien("D");   
      }
  else if ( transilien=="Ligne E" )
      {
        affiche_transilien("E");   
      }
  else if ( transilien=="Ligne H" || transilien=="Réseau Paris Nord"  )
      {
        affiche_transilien("H");   
      }
  else if ( transilien=="Ligne K" || transilien=="Réseau Paris Nord" )
      {
        affiche_transilien("K");   
      }
  else if ( transilien=="Ligne J" || transilien=="Réseau Paris Saint-Lazare" )
      {
        affiche_transilien("J");   
      }
  else if ( transilien=="Ligne L" || transilien=="Réseau Paris Saint-Lazare" )
      {
        affiche_transilien("L");   
      }
  else if ( transilien=="Ligne P" || transilien=="Réseau Paris Est" )
      {
        affiche_transilien("P");   
      }
  else if ( transilien=="Ligne T4" || transilien=="Réseau Paris Est" )
      {
        affiche_transilien("T4");   
      }
  else if ( transilien=="Ligne N" || transilien=="Réseau Paris Montparnasse" )
      {
        affiche_transilien("N");   
      }
  else if ( transilien=="Ligne R" || transilien=="Réseau Paris Lyon")
      {
        affiche_transilien("R");   
      }
  else if ( transilien=="Ligne U" || transilien=="Réseau La Défense - La Verrière")
      {
        affiche_transilien("U");   
      }

}

$(function() {
    var availableTags = [
      "Ligne H",
      "Ligne K",
      "Ligne J",
      "Ligne L",
      "Ligne P",
      "Ligne T4",
      "Ligne N",
      "Ligne R",
      "Ligne U",
      "Réseau Paris Nord",
      "Réseau Paris Saint-Lazare",
      "Réseau Paris Est",
      "Réseau Paris Montparnasse",
      "Réseau Paris Lyon",
      "Réseau La Défense - La Verrière"
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
       

        var transilien = ui.item.value;

        ligne_transilien(transilien);
        
    }

    });
  });