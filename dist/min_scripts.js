var pokemonRepository=function(){var t=[],o="https://pokeapi.co/api/v2/pokemon/?limit=150";function n(o){t.push(o)}function e(t){$(document).on("click",".pokemon-button",function(){var o=$("<h3>"+t.name+"</h3>"),n=$('<img class="modal-img">');n.attr("src",t.imageUrl);var e=$("<p> Height: "+t.height+" inches</p>");$("#pokemon-name").html(o),$("#pokemon-image").html(n),$("#pokemon-details").html(e),$("#modal").modal("show")})}return{add:n,getAll:function(){return t},addListItem:function(t){var o=$("<li>");$("ul").append(o);var n=$('<button class="btn btn-primary btn-block col-md-4 pokemon-button" data-toggle="modal" data-target="#modal-container">'+t.name+"</button>");o.append(n),n.on("click",function(){e(t)})},loadList:function(){return $.ajax(o).then(function(t){t.results.forEach(function(t){n({name:t.name,detailsUrl:t.url})})})},loadDetails:function(t){var o=t.detailsUrl;return $.ajax(o).then(function(o){t.imageUrl=o.sprites.front_default,t.height=o.height,t.types=Object.keys(o.types)})},showDetails:e}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t),pokemonRepository.loadDetails(t)})});
