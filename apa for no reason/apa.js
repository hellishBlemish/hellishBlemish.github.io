'use strict';

const html = document.querySelector('html');
const body = document.body;
const header = document.querySelector('header');
const nav = document.querySelector('nav');
const navbtn = nav.querySelector('button');
const navlist = nav.querySelectorAll('ul a[href]');
navlist.expanded = false;
const main = document.querySelector('main');
const footer = document.querySelector('body > footer');
const light = header.querySelector('#light-switch');

var scrollbarWidth = window.innerWidth - document.body.clientWidth;
document.documentElement.style.setProperty('--scrollbarWidth',scrollbarWidth+'px');

var vh = window.innerHeight / 100;
document.documentElement.style.setProperty('--vh',vh+'px');

window.addEventListener('resize', function(){
  let olvh = vh;
  vh = window.innerHeight / 100;
  if(olvh !== vh) document.documentElement.style.setProperty('--vh',vh+'px')
  
  let sw = scrollbarWidth;
  scrollbarWidth = window.innerWidth - document.body.clientWidth;
  if(sw !== scrollbarWidth) document.documentElement.style.setProperty('--scrollbarWidth',scrollbarWidth+'px');
})

nav.open = function(){
  if(!navlist.expanded){
    html.classList.add('open-nav');
    navbtn.setAttribute('aria-expanded','true');
    navbtn.innerHTML = '&times;';
    navlist.expanded = true;
    navlist.forEach(function(link){link.setAttribute('tabindex', '0')});
    navbtn.focus();
    setTimeout(function(){html.addEventListener('click',closeOnBlur)}, 10);
  }
}

nav.close = function(){
  if(navlist.expanded){
    html.classList.remove('open-nav');
    navbtn.setAttribute('aria-expanded','false');
    navbtn.innerHTML = '&#9776;';
    navlist.expanded = false;
    navlist.forEach(function(link){link.setAttribute('tabindex','-1')});
    html.removeEventListener('click',closeOnBlur);
  }
}

function toggleNav(){
  if(navlist.expanded){
    nav.close();
  }else{
    nav.open();
  }
}

navbtn.addEventListener('keydown',function(e){
  if(e.key === 'ArrowLeft' || e.key === 'ArrowRight'){
      light.focus();
    }
  if(navlist.expanded){
    if(charCheck(e.key)){
      navlist.focusByChar(0,e.key);
    }
    if(e.key === 'ArrowDown'){
      navlist[0].focus();
    }
    if(e.key === 'ArrowUp'){
      navlist[navlist.length - 1].focus();
    }
  }
})

light.addEventListener('keydown',function(e){
  if(e.key === 'ArrowLeft' || e.key === 'ArrowRight'){
    navbtn.focus();
  }
})

nav.addEventListener('keydown',function(e){
  if(navlist.expanded){
    if(e.key === 'Escape'){
      nav.close();
      navbtn.focus();
    }
    if(e.key === 'Home' || e.key === 'PageUp'){
      e.preventDefault();
      navlist[0].focus();
    }
    if(e.key === 'End' || e.key === 'PageDown'){
      e.preventDefault();
      navlist[navlist.length - 1].focus();
    }
  }
});

for(let i = 0; i < navlist.length; i++){
  navlist[i].addEventListener('keydown',function(e){
    if(charCheck(e.key)){
      navlist.focusByChar(i,e.key);
    }
    if(e.key === ' '){
      e.preventDefault();
    }
  })
}

navlist[navlist.length - 1].addEventListener('keydown',function(e){
  if(!e.shiftKey && e.key === 'Tab'){
    setTimeout(function(){
      if(!nav.contains(document.activeElement)){
        nav.close();
      }
    }, 900)
  }
})

function closeOnBlur(e){
  if(e.target !== nav && !nav.contains(e.target) && e.target !== header && !header.contains(e.target)){
    nav.close();
  }
}

function charCheck(str) {
  return str.length === 1 && str.match(/\S/);
}
navlist.focusByChar = function(item, char){  
  var start, index, char = char.toLowerCase();

  start = item + 1;
  if (start === this.length){
    start = 0;
  }

  index = this.getIndexByChar(start, char);
  if (index === -1) {
    index = this.getIndexByChar(0, char);
  }
  
  if(index > -1){
    this[index].focus();
  }
}
navlist.getIndexByChar = function(initial, char){
  for(let i = initial; i < this.length; i++){
    if(char == this[i].innerText.slice(0,1).toLowerCase()){
      return i;
    }
  }
  return -1;
}

nav.querySelector('ul').addEventListener('keydown',function(e){
  if(e.key === 'ArrowRight' || e.key === 'ArrowDown'){
    (navlist[navlist.indexOf(document.activeElement) + 1] || navlist[0]).focus();
  }
  if(e.key === 'ArrowLeft' || e.key === 'ArrowUp'){
    (navlist[navlist.indexOf(document.activeElement) - 1] || navlist[navlist.length - 1]).focus();
  }
})

NodeList.prototype.indexOf = function(obj, initial){
  if(initial && !this[initial]){
    return -1;
  }
  for(let i = (initial || 0); i < this.length; i++){
    if(this[i] === obj){return i}
  }return -1;
}


// open navigation tab by swiping left from right side of screen
/*
var start = null;
var startY = null;
var openMenu = false;
document.addEventListener('touchstart',function(e){
  if(e.targetTouches[0].clientX > 5*(body.clientWidth / 6)){
    start = e.targetTouches[0].clientX;
    startY = e.targetTouches[0].clientY;
    openMenu = true;
    setTimeout(function(){openMenu = false}, 200)
  }else{
    start = null;
    startY = null;
  }
})
document.addEventListener('touchend',function(e){
  if(start && openMenu && (start - e.changedTouches[0].clientX > 30) && (startY - e.changedTouches[0].clientY > -50) && (startY - e.changedTouches[0].clientY < 50)){
    nav.open();
  }
  start = null;
  startY = null;
})
*/

// light mode
const lightModeCSS = `
body, body *:not(nav):not(nav *):not(header):not(header *){
  background-color: #f6f4f2;
  color:#191819;
}
#light-switch button{background-color: #f6f4f2}
#light-switch button:after{
  content: 'on';
  left: 0;
}
a:link{color:rgb(0,102,204)}
a:visited{color:#551a8b}
nav footer p{color:#f6f4f2}
nav footer a:link{color: #52A8FF}
nav footer a:visited{color:#FF61FF}
`
if(window.matchMedia('(prefers-color-scheme: light)').matches){
  if(localStorage.getItem('light') && localStorage.getItem('light') === 'off'){
    html.classList.add('dark');
  }else{
    html.classList.add('light');
  }
}else{
  if(localStorage.getItem('light') === 'on'){
    html.classList.add('light');
  }else{
    html.classList.add('dark');
  }
}

function toggleLight(){
  if(localStorage.getItem('light') === 'on'){
    localStorage.setItem('light','off')
    html.classList.remove('light');
    html.classList.add('dark');
  }else{
    localStorage.setItem('light','on')
    html.classList.remove('dark');
    html.classList.add('light');
  }
}