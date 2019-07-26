var pokemonRepository = (function () {

  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

		var $newButton = $('<button class="list-item__button">' + pokemonObject.name + '</button>');
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

function showDetails(item) {
  loadDetails(item).then(function() {
    showModal(item);
  });
}

function showModal(item){
  var $modalContainer = $('#modal-container');

  $modalContainer.text(''); //clears existing html content

  var $modal = $('<div class="modal">');

  // Modal content
  var $closeButtonElement = $('<button class="modal-close"> Close </button>');
  $closeButtonElement.on('click', hideModal);

  var $titleElement = $('<h1>' + item.name + '</h1>');

  var $imageElement = $('<img class="modal-img">');
  $imageElement.attr('src', item.imageUrl);

  var $heightElement = $('<p> Height: ' + item.height + ' inches</p>');

  $modal.append($closeButtonElement);
  $modal.append($titleElement);
  $modal.append($imageElement);
  $modal.append($heightElement);
  $modalContainer.append($modal);

  $modalContainer.addClass('is-visible');
  }

  function hideModal() {
    var $modalContainer = $('#modal-container')
    $modalContainer.removeClass('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    var $modalContainer = $('#modal-container')
    if (e.key === 'Escape' && $modalContainer.hasClass('is-visible')) {
      hideModal();
    }
  });

  var $modalContainer = $('#modal-container');
  $modalContainer.on('click', function(event) {
    if ($(event.target).closest('#modal-container').length) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal
  };

} ) ();

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(eachPokemon) {
    pokemonRepository.addListItem(eachPokemon);
  });
} );
