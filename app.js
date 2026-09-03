'use strict';
const page=document.querySelector('#condo'),back=document.querySelector('.back');
function route(){const open=location.hash==='#condo';document.body.classList.toggle('room-open',open);page.classList.toggle('active',open);page.setAttribute('aria-hidden',String(!open));document.title=open?'Condo Room — CAN AV Guide':'CAN — AV Guide';if(open){scrollTo(0,0);back.focus({preventScroll:true})}}
back.addEventListener('click',()=>location.hash='rooms');window.addEventListener('hashchange',route);route();

