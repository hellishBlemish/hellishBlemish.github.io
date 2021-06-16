//shiny day

var fantaRingtone = new Audio('https://freesound.org/data/previews/276/276608_4409114-lq.mp3');
var winningSFX = new Audio('https://freesound.org/data/previews/269/269198_4409114-lq.mp3');
var clip = document.getElementById('clip');
var fight = document.getElementById('fighters');
var game = document.getElementById('gameart');
var sq = document.getElementById('squirrel');

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

function play(el){
  el.classList.add('play');
  if(el==andi){
    setTimeout(function(){el.classList.remove('play')},6200);
    document.querySelector('#andi button').classList.remove('new');
  }
  return console.log('Played.');
}

window.addEventListener('resize', function(){
  game.style.transform = 'scale('+ checkScale() +')';
  game.style.left = '-'+544/2*(1-checkScale())+'px';
  game.style.top = '-'+416/2*(1-checkScale())+'px';
});

function checkScale(){
  if(window.innerWidth/544 < 1){
    return window.innerWidth/544;
  }else{
    return 1;
  }
}

window.onload = function(){
  game.style.transform = 'scale('+ checkScale() +')';
  game.style.left = '-'+544/2*(1-checkScale())+'px';
  game.style.top = '-'+416/2*(1-checkScale())+'px';
  window.setInterval(function(){
    if(!sq.classList.contains('run')){
      sq.classList.replace('idle','looking');
      setTimeout(function(){
        sq.classList.replace('looking','idle');
      },1000*getRandomInt(1,3));
    };
  }, getRandomInt(5000,20000));
}

function pokeSquirrel(){
  if(sq.classList.contains('run')){
    return console.log('Already running!');
  }
  if(sq.classList.contains('looking')){
    sq.classList.replace('looking','idle');
  }
  if(sq.classList.contains('first-base')){
    sq.classList.replace('first-base','second-base');
    sq.classList.replace('idle','run');
    setTimeout(function(){
      sq.classList.add('left');
      sq.classList.replace('run','idle');
    },3999);
  }else if(sq.classList.contains('second-base')){
    sq.classList.replace('second-base','first-base');
    sq.classList.replace('idle','run');
    setTimeout(function(){
      sq.classList.remove('left');
      sq.classList.replace('run','idle');
    },3999);
  }else{
    sq.classList.add('second-base');
    sq.classList.replace('idle','run');
    setTimeout(function(){
      sq.classList.add('left');
      sq.classList.replace('run','idle');
    },3999);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// I think it's about time I move on to something bigger now, with this newfound knowledge. I've learned quite a bit. For one, I think I shoulda started by making objects instead of element variables.

//EXAMPLE:

// not var clip = getElementById('clip') -- nope

/*  instead I should

var clip = {
  el: getElementById('clip'),
  width: 206.8,
  height: 126,
  audio: new Audio(src),
}

etc etc, so it's a bit cleaner.
clip.audio is nicer than fantaRingtone, though ofc if I'm goign to use fantaRingtone for more than just clip, it's fine to declare the audio outside an object anyway (though clip.audio would also work just fine, js);
el.audio is fine if the the element has a specific soundtrack for itself and no interactivity, like background-music. i'd have to get more specific with sfx. could still make it part of the obj, though tbh i dunno why I would have more than one or two interactive animations on a single page other than to test things out like i've done in shinyday /shrug :)

*/