function turnOnModal(item){
	item.classList.add('show');
	item.classList.remove('hide');
}
function turnOffModal(item){
	item.classList.add('hide');
	item.classList.remove('show');
	document.body.style.overflow = '';
}

function modals(trigerSelector, modalSelector){
    const modalTrigger = document.querySelectorAll(trigerSelector),
    modal = document.querySelector(modalSelector);


modalTrigger.forEach(item=>{
  item.addEventListener('click', ()=>{
      turnOnModal(modal);
      document.body.style.overflow = 'hidden';
});
});

// закрытие не на кресстик 
modal.addEventListener('click', (e) => {
  if (e.target === modal || e.target.getAttribute("data-close") == ''){
      turnOffModal(modal);
  }
});
// на кнопку esc

document.addEventListener('keydown', (e)=>{
if (e.code ==="Escape" && modal.classList.contains('show')){
  turnOffModal(modal);
}
}); 

function showModalByScroll(){
if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){
  turnOnModal(modal);
  window.removeEventListener('scroll', showModalByScroll);
}}

window.addEventListener('scroll', showModalByScroll);

}
export default modals;
export{turnOffModal};
export{turnOnModal};
