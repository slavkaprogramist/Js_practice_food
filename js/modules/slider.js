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

export default slider;