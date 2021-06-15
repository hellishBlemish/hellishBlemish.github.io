//shiny day

var fantaRingtone = new Audio('https://freesound.org/data/previews/276/276608_4409114-lq.mp3');
var winningSFX = new Audio('https://freesound.org/data/previews/269/269198_4409114-lq.mp3');
var clip = document.getElementById('clip');
var fight = document.getElementById('fighters');

function playClip(){
  clip.classList.add('play');
  fantaRingtone.play()
  setTimeout(function(){clip.classList.remove('play')},2500);
  document.querySelector('#clip button').classList.remove('new');
  return console.log('Playing: Clip');
}

function playFight(){
  fight.classList.add('play');
  setTimeout(function(){winningSFX.play()}, 400);
  setTimeout(function(){fight.classList.remove('play')},2500);
  document.querySelector('#fighters button').classList.remove('new');
  return console.log('Playing: Fight');
}