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

const scrollbarWidth = window.innerWidth - document.body.clientWidth;
document.documentElement.style.setProperty('--scrollbarWidth',scrollbarWidth+'px');

var vh = window.innerHeight / 100;
document.documentElement.style.setProperty('--vh',vh+'px');

window.addEventListener('resize', function(){
  vh = window.innerHeight / 100;
  document.documentElement.style.setProperty('--vh',vh+'px')
})

nav.open = function(){
  if(!navlist.expanded){
    html.classList.add('open-nav');
    navbtn.setAttribute('aria-expanded','true');
    navbtn.innerHTML = '&times;';
    navlist.expanded = true;
    navlist.forEach((link)=>link.removeAttribute('tabindex'));
    nav.querySelector('footer a').removeAttribute('tabindex');
    html.addEventListener('click', closeOnBlur)
  }
}

nav.close = function(){
  if(navlist.expanded){
    html.classList.remove('open-nav');
    navbtn.setAttribute('aria-expanded','false');
    navbtn.innerHTML = '&#9776;';
    navlist.expanded = false;
    navlist.forEach((link)=>link.setAttribute('tabindex','-1'));
    nav.querySelector('footer a').setAttribute('tabindex','-1');
    html.removeEventListener('click',closeOnBlur);
  }
}

navbtn.addEventListener('click',function(){
  if(navlist.expanded){
    nav.close();
  }else{
    nav.open();
  }
});

navbtn.addEventListener('keydown',function(e){
  if(charCheck(e.key)){
    navlist.focusByChar(0,e.key);
  }
  if(e.shiftKey && e.key === 'Tab'){
    setTimeout(function(){
      if(!nav.contains(document.activeElement)){
        nav.close();
      }
    }, 900)
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

function closeOnBlur(e){
  if(e.target !== nav && !nav.contains(e.target) && e.target !== header){
    nav.close();
  }
}

nav.querySelector('footer a').addEventListener('focusin',function(){
  nav.querySelector('div').scrollTop = nav.querySelector('div').scrollTopMax;
})

document.querySelector('body > footer a').addEventListener('focusin',function(){
  html.scrollTop = html.scrollTopMax;
})
  
nav.querySelector('footer a').addEventListener('keydown',function(e){
  if(!e.shiftKey && e.key === 'Tab'){
    setTimeout(function(){
      if(!nav.contains(document.activeElement)){
        nav.close();
      }
    }, 900)
  }
})

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


// open navigation tab by swiping left from right corner
var start = null;
var startY = null;
var openMenu = false;
document.addEventListener('touchstart',function(e){
  if(e.targetTouches[0].clientX > 2*(body.clientWidth / 3)){
    start = e.targetTouches[0].clientX;
    startY = e.targetTouches[0].clientY;
    openMenu = true;
    setTimeout(()=>openMenu = false, 150)
  }else{
    start = null;
    startY = null;
  }
})

document.addEventListener('touchend',function(e){
  if(start && openMenu && (start - e.changedTouches[0].clientX > 30) && (startY - e.changedTouches[0].clientY > -100) && (startY - e.changedTouches[0].clientY < 100)){
    nav.open();
  }
  start = null;
  startY = null;
})