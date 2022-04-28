/*
NOM :
Prénom :

NOM :
Prénom :

*/

function alea(min, max) { // [0;15[
  return Math.floor((Math.random() * (max - min)) + min)
}

const liste_tuile = []; /* liste des tuiles : i = position dans puzzlearea, liste_tuile[i] = numéro de la tuile */

/* Cette fonction calcule les coordonées de la tuile à la position n de puzzlearea (le n passé en paramètre est l'index de la liste liste_tuile) et positionne la tuile liste_tuile[n] au bon endroit*/
function set_tile_position(n) {
  var num_tile = liste_tuile[n];
  var row = Math.floor(n / 4);
  var col = n % 4;
  $("#tile" + num_tile).css({ top: 90 * row, left: 90 * col });
}

/* Boucle pour initialiser les tuiles*/
for (var i = 0; i < 16; i++) {
  liste_tuile[i] = i;
  var tile = $("<div id=\"tile" + i + "\"> <p>" + i + "</p></div>").addClass("tuile");
  if (i < 15)
    tile.css({ "background-image": "url('/kit/img/0" + i + ".jpg')" });
  $("#puzzlearea").append(tile);
  set_tile_position(i);
}

/* Cette fonction trie liste_tuile d'une manière aléatoire et repositionne les tuiles*/
function shuffle() {
  for (var i = 15; i >= 0; i--) {
    var j = alea(0, i);
    var temp = liste_tuile[i];
    liste_tuile[i] = liste_tuile[j];
    liste_tuile[j] = temp;
    set_tile_position(i);
  }
}

$("#shuffle").click(function () { shuffle() })