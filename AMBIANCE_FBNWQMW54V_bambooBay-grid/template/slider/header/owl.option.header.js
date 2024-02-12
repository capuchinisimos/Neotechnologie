/* HEADER
============================================== */
$('.owl-carousel.header').owlCarousel({
    loop:true,
    items: 1,
    lazyLoad: true,
    nav: false,
    dots: false,
    mouseDrag: false,
    touchDrag: false,
    autoplay: true,
    autoplayTimeout: 8000,
    lightbox: false,
    animateOut: 'fadeOutKenBurns',
    animateIn: 'fadeInKenBurns'
    // animateOut: 'fadeOut',
    // animateIn: 'fadeIn'

});

/* HEADER02
============================================== */
$('.owl-carousel.header02').owlCarousel({
    loop:true,
    lazyLoad: true,
    nav: true,
    dots: false,
    autoplay: true,
    mouseDrag: true,
	touchDrag: true,
	center: false,
    smartSpeed: 1000,
    autoplayTimeout: 5000,
    lightbox: false,
	margin : 25,
	stagePadding : 0,
    responsiveClass:true,
    navText: ['<span class="owl-arrow"><svg class="owl-icon" width="64" height="64" viewBox="0 0 64 64"><path d="M46.077 55.738c0.858 0.867 0.858 2.266 0 3.133s-2.243 0.867-3.101 0l-25.056-25.302c-0.858-0.867-0.858-2.269 0-3.133l25.056-25.306c0.858-0.867 2.243-0.867 3.101 0s0.858 2.266 0 3.133l-22.848 23.738 22.848 23.738z"/></svg></span><span class="owl-arrow-bg"></span>', '<span class="owl-arrow"><svg class="owl-icon" width="64" height="64" viewBox="0 0 64 64"><path d="M17.919 55.738c-0.858 0.867-0.858 2.266 0 3.133s2.243 0.867 3.101 0l25.056-25.302c0.858-0.867 0.858-2.269 0-3.133l-25.056-25.306c-0.858-0.867-2.243-0.867-3.101 0s-0.858 2.266 0 3.133l22.848 23.738-22.848 23.738z"/></svg></span><span class="owl-arrow-bg"></span>'],
    responsive:{
        0:{
            items: 1
        },
        641:{
            items: 1
        },
        768: {
            items: 1
        },
        1025: {
            items: 2
        },
        1280:{
            items: 2
        },
        1360: {
            items: 2
        }
    }
});
