var slidePosition = 1;
showSlides(slidePosition);


//image controls
function currentSlide(n); {

}
function SlideShow(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dots");
    if (n > slides.length) {slidePosition = 1}
    if (n < 1) {slidePosition = slides.length }
    for ( i=0; i < slides.length; i++) {
        slides[i].st
    }
}
