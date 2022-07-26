window.addEventListener('DOMContentLoaded', () => {
    // BodyMovin, documentation: https://github.com/airbnb/lottie-web
    const animation = bodymovin.loadAnimation({
        container: document.querySelector('#logo-video'),
        rederer: 'svg',
        loop: false,
        autoplay: true,
        path: 'js/animation.json'
    });

    // Header class on scroll
    let header = document.querySelector('#header'),
        nav = document.querySelector('#nav');

    headerScroll();

    window.addEventListener('scroll resize', function() {
        headerScroll();
    });

    function headerScroll () {
        window.addEventListener('scroll', function() {
            let scrollH = this.scrollY,
                headerH = header.scrollHeight,
                navH = nav.scrollHeight;
    
            if (scrollH >= headerH + navH) {
                nav.classList.add('nav-active');
            } else {
                nav.classList.remove('nav-active');
            }
        });
    }

    // Slick-slider, documentation: https://kenwheeler.github.io/slick/

    $('.preview__slider_wrapper').slick({
        infinite: true,
        adaptiveHeight: true,
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 6000,
        arrows: false,
        dots: false
      });

});
