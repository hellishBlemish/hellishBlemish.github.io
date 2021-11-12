'use strict';

const menubtn = document.querySelector('nav > button');
const navel = document.querySelector('nav');
const nav = document.querySelector('#navmenu');
nav.expanded = false;

nav.open = function(){
  nav.resetTabindex();
  navel.classList.add('open');
  menubtn.setAttribute('aria-expanded','true');
  nav.expanded = true;
  menubtn.innerHTML = '&times;';
}

nav.close = function(){
  navel.classList.remove('open');
  menubtn.setAttribute('aria-expanded','false');
  nav.expanded = false;
  menubtn.innerHTML = '&#9776;';
}

nav.resetTabindex = function(){
  navitems[0].setAttribute('tabindex','0');
  for(let i = 1; i < navitems.length; i++){
    navitems[i].setAttribute('tabindex','-1');
  }
}

menubtn.addEventListener('click',function(e){
  if(nav.expanded){
    nav.close();
  }else{
    nav.open();
  }
})

menubtn.addEventListener('keydown',function(e){
  if(e.key === ' ' || e.key === 'Enter'){
    e.preventDefault();
    if(nav.expanded){
      nav.close();
    }else{
      nav.open();
      nav.goToFirst();
    }
  }
  if(e.key === 'ArrowDown'){
    e.preventDefault();
    nav.open();
    nav.goToFirst();
  }
  if(e.key === 'ArrowUp'){
    e.preventDefault();
    nav.open();
    nav.goToLast();
  }
})

nav.goToFirst = function(){
  nav.resetTabindex();
  navitems[0].focus();
}

nav.goToLast = function(){
  let last = navitems.length - 1;
  for(let i = 0; i < last - 1; i++){
    navitems[i].setAttribute('tabindex','-1');
  }
  navitems[last].setAttribute('tabindex','0');
  navitems[last].focus();
}

const navitems = document.querySelectorAll('#navmenu a');
for(let i = 0; i < navitems.length; i++){
  if(i == 0){
    navitems[i].next = navitems[1];
    navitems[i].prev = navitems[navitems.length - 1];
  }else if(i == navitems.length-1){
    navitems[i].next = navitems[0];
    navitems[i].prev = navitems[i - 1];
  }else{
    navitems[i].next = navitems[i + 1];
    navitems[i].prev = navitems[i - 1];
  }
  
  navitems[i].goNext = function(){
    this.setAttribute('tabindex', '-1');
    this.next.setAttribute('tabindex','0');
    this.next.focus();
  }
  navitems[i].goPrev = function(){
    this.setAttribute('tabindex','-1');
    this.prev.setAttribute('tabindex','0');
    this.prev.focus();
  }
  
  navitems[i].addEventListener('keydown', function(e){
    if(e.key === 'ArrowRight' || e.key === 'ArrowDown'){
      e.preventDefault();
      navitems[i].goNext();
    }
    if(e.key === 'ArrowLeft' || e.key === 'ArrowUp'){
      e.preventDefault();
      navitems[i].goPrev();
    }
    if(e.key === 'Escape'){
      e.preventDefault();
      nav.close();
      menubtn.focus();
    }
    if(e.key === 'Shift' && e.key === 'Tab'){
      // do...norm???
    }else if(e.key === 'Tab'){
      nav.close(); //blur
    }
    if(e.key === 'Home' || e.key === 'PageUp'){
      e.preventDefault();
      nav.goToFirst();
    }
    if(e.key === 'End' || e.key === 'PageDown'){
      e.preventDefault();
      nav.goToLast();
    }
    if(e.key === ' '){
      e.preventDefault();
      navitems[i].click();
    }
    if(charCheck(e.key)){
      nav.focusByChar(i, e.key);
    }
  })
  
}


// outright taken from w3.org because I was too blind to understand how the fuck letters work ha:

function charCheck(str) {
  return str.length === 1 && str.match(/\S/);
}

nav.focusByChar = function(item, char){  
  var start, index, char = char.toLowerCase();

  start = item + 1;
  if (start === navitems.length){
    start = 0;
  }

  index = nav.getIndexByChar(start, char);
  if (index === -1) {
    index = nav.getIndexByChar(0, char);
  }

  if (index > -1) {
    navitems[item].setAttribute('tabindex','-1');
    navitems[index].setAttribute('tabindex','0');
    navitems[index].focus();
  }
}

nav.getIndexByChar = function(initial, char){
  for(let i = initial; i < navitems.length; i++){
    if(char == navitems[i].innerText.slice(0,1).toLowerCase()){
      return i;
    }
  }
  return -1;
}