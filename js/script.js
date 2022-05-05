import tabs from "./modules/tabs";
import modals from "./modules/modals";
import cards from "./modules/cards";
import calculator from "./modules/calculator";
import forms from "./modules/forms";
import slider from "./modules/slider";
import timer from "./modules/timer";

window.addEventListener('DOMContentLoaded', () =>{
tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
modals('[data-modal]', '.modal');
cards();
calculator();
forms('form');
slider();
timer('.timer', '2022-07-11');
});