/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator(){
    const result = document.querySelector(".calculating__result span");


    let sex, 
        ratio,
        weight, age, height;
    
        if ( localStorage.getItem('sex')){
            sex  = localStorage.getItem('sex');
        } else {
            sex ="female";
            localStorage.setItem("sex","female");
        }
    
        if ( localStorage.getItem('ratio')){
            ratio  = localStorage.getItem('ratio');
        } else {
            ratio =1.375;
            localStorage.setItem("ratio",1.375);
        }
    calcTotal();
    
    function initLocalSettings(selector, activeClass){
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem =>{
                    elem.classList.remove(activeClass);
                    if(elem.getAttribute('id') === localStorage.getItem('sex')) {
                        elem.classList.add(activeClass);
                    }
                    if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                        elem.classList.add(activeClass);
                    }
    
                });
            
    }
    initLocalSettings("#gender div", 'calculating__choose-item_active');
    initLocalSettings(".calculating__choose_big div", 'calculating__choose-item_active');
    
    function calcTotal() {
        if( !sex || !height || !weight || !age || !ratio ){
            result.textContent = '____';
            return;
        }
    
        if ( sex === "female"){
            result.textContent = Math.round((447.6 + (9.2*height) + (3.1*weight) - (4.3* age)) * ratio);
        }
        else{
            result.textContent = Math.round((88.36 + (13.4*height) + (4.8*weight) - (5.7* age)) * ratio);
        }
    }
    
    
    
    function getStaticInfo(selector, activeClass){
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem =>{
            elem.addEventListener('click', (e)=>{
                if (e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else{
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
        
                console.log(ratio,sex);
        
                elements.forEach(elem =>{
                    elem.classList.remove(activeClass);
                });
        
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    
    }
    
    
    getStaticInfo("#gender div" , 'calculating__choose-item_active');
    getStaticInfo(".calculating__choose_big div", 'calculating__choose-item_active');
    
    function getInputInfo(selector){
        const input = document.querySelector(selector);
    
    
        input.addEventListener('input', ()=>{
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else{
                input.style.border = '1px solid #54ed39';
            }
            switch(input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;    
                case 'age':
                    age = +input.value;
                    break;  
            }

            calcTotal();
        });
    
    }
    
    getInputInfo('#height');
    getInputInfo('#weight');
    getInputInfo('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

function cards(){
    class MenuCard{
        constructor(src,alt,title,descr,price, parentSelector, ...classes){
            this.src = src;
            this.alt =alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.chngetoUAH();
        }
    
        chngetoUAH(){
            this.price = +this.price * this.transfer;
        }
        render(){
            const element = document.createElement("div");
            if(this.classes.length === 0){
                this.element= 'menu__item';
                element.classList.add(this.element);
            }
            else{
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML =`
            <img src="${this.src}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">${this.title}"</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
            `;
            this.parent.append(element);
        }
    }
    
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modals.js */ "./js/modules/modals.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector){
    const forms = document.querySelectorAll(formSelector);

const message ={
    loading: 'img/form/spinner.svg',
    success: 'Спасибо!',
    fail:'error'
};

forms.forEach(item=>{
    bindPostData(item);
});



function bindPostData(form){
    form.addEventListener('submit', (e)=> {
        e.preventDefault();

        const statusMesage = document.createElement('img');
        statusMesage.src = message.loading;
        statusMesage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMesage);
       
        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));
        (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
        .then(data =>{
            console.log(data);
            showModalDialog(message.success);
            statusMesage.remove();
        }).catch(() =>{
            showModalDialog(message.fail);
        }).finally(() =>{
            form.reset();
        });

});
}
function showModalDialog(message){

    const prevModalDialog = document.querySelector('.modal__dialog'),
    modal = document.querySelector(".modal");

    prevModalDialog.classList.add('hide');
    (0,_modals_js__WEBPACK_IMPORTED_MODULE_0__.turnOnModal)(modal);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
    <div class="modal__content">
    <div data-close class="modal__close">&times;</div>
    <div class="modal__title">${message}</div>
    </div>
    `;
    document.querySelector('.modal').append(thanksModal);

    setTimeout(()=>{
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        (0,_modals_js__WEBPACK_IMPORTED_MODULE_0__.turnOffModal)(modal);

    }, 4000);
}   

fetch("http://localhost:3000/menu")
    .then(data => data.json())
    .then(res => console.log(res));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modals.js":
/*!******************************!*\
  !*** ./js/modules/modals.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "turnOffModal": () => (/* binding */ turnOffModal),
/* harmony export */   "turnOnModal": () => (/* binding */ turnOnModal)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modals);




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider(){
    const slides = document.querySelectorAll(".offer__slide"),
      currSlide = document.getElementById('current'),
      nextSlide = document.getElementById("total"),
      prev = document.querySelector(".offer__slider-prev"),
      next = document.querySelector(".offer__slider-next");
    let slideIndex = 1;


    if(slides.length <10){

        nextSlide.textContent =`0${slides.length}`;
    } else {
        nextSlide.textContent = slides.length;
    }
    showSlides(slideIndex);

    function showSlides(n){

        if(n > slides.length){
            slideIndex = 1;
        }
        if(n < 1){
            slideIndex = slides.length;
        }

        slides.forEach(item => item.classList.add('hide'));

        slides[slideIndex - 1].classList.add('show');
        slides[slideIndex - 1].classList.remove('hide');

        if(slides.length <10){
            currSlide.textContent =`0${slideIndex}`;
        } else {
            currSlide.textContent = slideIndex;
        }
        
    }

    function slidesIncrease(n){
        showSlides(slideIndex +=n);
    }

    prev.addEventListener('click', ()=>{
        slidesIncrease(-1);
    });

    next.addEventListener('click', ()=>{
        slidesIncrease(1);
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector,tabsContentSelector,tabsParentSelector,activeClass){
    const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);


    function hideTabConent(){
    tabsContent.forEach( item =>{
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });
    tabs.forEach(tab =>{
        tab.classList.remove(activeClass);
    });
    }

    function showTabContent(i = 0){
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
    }
    hideTabConent();
    showTabContent();


    tabsParent.addEventListener('click', (event)=>{
    const target = event.target;

    if ( target && target.classList.contains(tabsSelector.slice(1))) {
        tabs.forEach((item,i) => {
            if(target == item){
                hideTabConent();
                showTabContent(i);
            }
        });
    }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadLine){

// Time remain
    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(t/(1000 * 60 *60* 24)),
        hours = Math.floor((t/(1000 * 60 *60) % 24)),
        minutes = Math.floor((t/(1000 * 60))% 60),
        seconds = Math.floor((t/ 1000)% 60);

        return {
            'total':t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds':seconds
        };
        
    }

    function getZero (num){
        if( num >= 0 && num< 10 ){
            return `0${num}`;
        } else{
            return num;
        }
    }
    function setClock(selector, endtime){

        const timer = document.querySelector(selector),
             days = timer.querySelector('#days'),
             hours = timer.querySelector('#hours'),
             minutes = timer.querySelector('#minutes'),
             seconds = timer.querySelector('#seconds'),
             timeInterval = setInterval(updateClock, 1000);
             updateClock();


        function updateClock(){
            const t = getTimeRemaining(endtime);            
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0){
                clearInterval(timeInterval);
            }            
        }
              
    }
    setClock(id, deadLine);}

    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url,data) =>{
    const res = await fetch(url,{
        method: 'POST',
        headers:{
            'Content-type':'application/json'
        },
        body: data
    });

    return await res.json();
};
async function getResource (url){
    const res = await fetch(url);

    if(!res.ok){
        throw new Error(`could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modals */ "./js/modules/modals.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");








window.addEventListener('DOMContentLoaded', () =>{
(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
(0,_modules_modals__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal');
(0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
(0,_modules_calculator__WEBPACK_IMPORTED_MODULE_3__["default"])();
(0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form');
(0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])();
(0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2022-07-11');
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map