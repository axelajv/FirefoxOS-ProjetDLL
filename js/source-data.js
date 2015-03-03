$(function() {
    var availableTags = [
      "RER A",
      "RER B",
      "RER C",
      "RER D",
      "RER E",
      "Métro 1",
      "Métro 2",
      "Métro 3",
      "Métro 3 bis",
      "Métro 4",
      "Métro 5",
      "Métro 6",
      "Métro 7",
      "Métro 7 bis",
      "Métro 8",
      "Métro 9",
      "Métro 10",
      "Métro 11",
      "Métro 12",
      "Métro 13",
      "Métro 14"
    ];
    $( "#recherche-ligne" ).autocomplete({
      source: availableTags,

      messages: {
        noResults: '',
        results: function() {}
    },

    select : function(event, ui){
        alert( ui.item.value ); // lance une alerte indiquant la valeur de la proposition
    }

    });
  });