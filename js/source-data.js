$(function() {
    var availableTags = [
      "RER A",
      "RER B",
      "RER C",
      "RER D",
      "RER E",
      "Metro 1",
      "Metro 2",
      "Metro 3",
      "Metro 3 bis",
      "Metro 4",
      "Metro 5",
      "Metro 6",
      "Metro 7",
      "Metro 7 bis",
      "Metro 8",
      "Metro 9",
      "Metro 10",
      "Metro 11",
      "Metro 12",
      "Metro 13",
      "Metro 14"
    ];
    $( "#recherche-ligne" ).autocomplete({
      source: availableTags,

      messages: {
        noResults: '',
        results: function() {}
    },

    select : function(event, ui){

        //alert( ui.item.value );

        var metro = ui.item.value;

        if ( metro=="Metro 1")
        {
          window.location.replace("affiche-metro.html");
        }
        
        //alert( ui.item.value ); // lance une alerte indiquant la valeur de la proposition
    }

    });
  });