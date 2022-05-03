/*
NOM : FRANZ 
Prénom : Axel

NOM : ARUST
Prénom : Laura

*/

function alea(min, max) { // [0;15[
	return Math.floor((Math.random() * (max - min)) + min)
}

const liste_tuile = []; /* liste des tuiles : i = position de la case dans puzzlearea, liste_tuile[i] = numéro de la tuile */
const liste_finale = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; /* liste dans le bon ordre pour n'avoir qu'une seule déclaration du puzzle fini*/


/* Teste l'égalité de deux tableaux*/
function isEqual(t1, t2) {
	var egal = true;
	for (var i = 0; i < t1.length; i++) {
		if (t1[i] != t2[i]) {
			egal = false;
		}
	}
	return egal;

}

/* Cette fonction calcule les coordonnées de la tuile à la position n de puzzlearea (le n passé en paramètre est l'index de la liste liste_tuile) et positionne la tuile liste_tuile[n] au bon endroit*/
function set_tile_position(n) {
	var num_tile = liste_tuile[n];
	var row = Math.floor(n / 4);
	var col = n % 4;
	$("#" + num_tile).css({ top: 90 * row, left: 90 * col });
}

/* Fonction pour initialiser les tuiles*/
function init() {
	for (var i = 0; i < 16; i++) {
		liste_tuile[i] = i;
		var tile = $("<div id=\"" + i + "\"> <p>" + i + "</p></div>").addClass("tuile");
		if (i < 15)
			tile.css({ "background-image": "url('./img/0" + i + ".jpg')" });
		$("#puzzlearea").append(tile);
		set_tile_position(i);
	}
}

/* Cette fonction trie liste_tuile d'une manière aléatoire et repositionne les tuiles.*/
function shuffle() {
	$(".tuile").off("click").on("click", function () {
		check_and_swap(this); console.log("CLICK");
	});
	for (var i = 15; i >= 0; i--) {
		var j = alea(0, i);
		var temp = liste_tuile[i];
		liste_tuile[i] = liste_tuile[j];
		liste_tuile[j] = temp;
		set_tile_position(i);
	}
}

/* Cette fonction permet d'échanger sur la liste et visuellement la place de 2 éléments*/
function swap(elem1, elem2) {
	var tmp = liste_tuile[elem1];
	liste_tuile[elem1] = 15;
	liste_tuile[elem2] = tmp;
	set_tile_position(elem1);
	set_tile_position(elem2);
}

function puzzle_solved() {
	if (isEqual(liste_tuile, liste_finale)) {
		$("#output").text("Le puzzle est résolu");
		$(".tuile").off("click"); // L'écouteur d'évènement est détaché
	}
}

/* Permet de bouger les cases et vérifie si le puzzle est fini */
function check_and_swap(elem) {
	$("#output").text("");
	var idCase = parseInt(elem.id);
	var index = liste_tuile.indexOf(idCase);
	if (liste_tuile[index + 1] == 15)
		swap(index, index + 1);
	else if (liste_tuile[index + 4] == 15)
		swap(index, index + 4);
	else if (liste_tuile[index - 1] == 15)
		swap(index, index - 1);
	else if (liste_tuile[index - 4] == 15)
		swap(index, index - 4);
	else {
		$("#output").text("Mouvement impossible");
		return;
	}
	puzzle_solved();
}

// Initialisation de la grille et des écouteurs d'évènement
init();
$(document).ready(function () {
	$(".tuile").click(function () {
		check_and_swap(this)
	});
	$("#shuffle").click(function () {
		shuffle()
	});
})

