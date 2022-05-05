import{turnOffModal,turnOnModal} from './modals.js';
import {postData} from "../services/services";

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
        postData('http://localhost:3000/requests', json)
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
    turnOnModal(modal);

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
        turnOffModal(modal);

    }, 4000);
}   

fetch("http://localhost:3000/menu")
    .then(data => data.json())
    .then(res => console.log(res));
}
export default forms;
