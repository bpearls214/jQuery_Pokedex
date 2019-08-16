var pokemonRepository = (function () {

  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  var $modalContainer = $('#modal-container');

  function loadList() {
    // data fetch from API
    return $.ajax(apiUrl)
    .then(function(response) {
      response.results.forEach(function(item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        // adds data to the repository
        add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      } );
  }


 function loadDetails(item) {
  var url = item.detailsUrl;
  return $.ajax(url)
    .then(function(response) {
    // pokemon details as designated within API
    item.imageUrl = response.sprites.front_default;
    item.height = response.height;
    item.types = Object.keys(response.types);
  })
    .catch(function (e) {
    console.error(e);
  });
}

  function addListItem(pokemonObject) {
		var $newListItem = $('<li>'); // adds li in DOM
    $('ul').append($newListItem); // chooses ul

		var $newButton = $('<button class="btn btn-primary btn-block col-md-4 pokemon-button" data-toggle="modal" data-target="#modal-container">' + pokemonObject.name + '</button>');
    $newListItem.append($newButton) //appends button to details url as child

		$newButton.on('click', function() {
			showDetails(pokemonObject);
	   });
   }

  function add(pokemon){
       repository.push(pokemon);
    }

  function getAll() {
     return repository;
   }

function showDetails(item){
  $(document).on('click', '.pokemon-button', function() {
    // Modal content
    var $titleElement = $('<h3>' + item.name + '</h3>');
    var $imageElement = $('<img class="modal-img">');
      $imageElement.attr('src', item.imageUrl);
    var $heightElement = $('<p> Height: ' + item.height + ' inches</p>');

    $('#pokemon-name').html($titleElement);
    $('#pokemon-image').html($imageElement);
    $('#pokemon-details').html($heightElement);
    $('#modal').modal('show');
  });
}

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };

} ) ();

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(eachPokemon) {
    pokemonRepository.addListItem(eachPokemon);
    pokemonRepository.loadDetails(eachPokemon);
  });
} );
