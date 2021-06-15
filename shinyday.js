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
