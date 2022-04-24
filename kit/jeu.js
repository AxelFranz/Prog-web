/*
NOM :
Prénom :

NOM :
Prénom :

*/

function alea(min, max) { // [0;15[
  return Math.floor((Math.random() * (max - min)) + min)
}

for (var i = 0; i < 16; i++) {
  console.log(i);
  var row = Math.floor(i/4); 
  var col = i%4;
  var tile = $("<div id=\"tile"+i+"\"> <p>"+i+"</p></div>").addClass("tuile");
  tile.css({top: 90*row, left: 90*col});
  if(i<15)
  tile.css({"background-image":"url('/kit/img/0"+i+".jpg')"});
  $("#puzzlearea").append(tile);
}
