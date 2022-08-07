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
    let header = document.querySelector('#headerInner'),
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

    // Burger nav

    $('#navToggle').on('click', function(e) {
        e.preventDefault();

        $(this).toggleClass('burger-active');
        $('#nav').toggleClass('nav-show');
        $('.burger__line').toggleClass('show');
    });

    // Slick-slider, documentation: https://kenwheeler.github.io/slick/
    $('.preview__slider_wrapper').slick({
        infinite: true,
        adaptiveHeight: true,
        slidesToShow: 5,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 6000,
        arrows: false,
        dots: true,
        pauseOnDotsHover: true,
        responsive: [
            {
                breakpoint: 1201,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    // Modal help with size of the wedding dress
    
    // Function modal open with animation
    $('[data-modal]').on('click', function(e) {
        e.preventDefault();

        let modal = $(this).data('modal');
        $('body').addClass('no-scroll');
        $(modal).addClass('modal-show');

        setTimeout(function() {
            $(modal).find('.modal__content').css({
                transform: 'translateY(0)',
                opacity: '1'
            });
        });
    });

    // Modal close with animation
    $('[data-modal-close]').on('click', function(e) {
        e.preventDefault();

        let modal = $(this).parents('.modal');
        modalClose(modal);
    });

    $('.modal').on('click', function() {
        let modal = $(this);
        modalClose(modal);
    });
    
    $('.modal__content').on('click', function(e) {
        e.stopPropagation();
    });

    function modalClose(modal) {
        modal.find('.modal__content').css({
            transform: 'translateY(-100px)',
            opacity: '0'
        });

        setTimeout(function() {
            $('body').removeClass('no-scroll');
            modal.removeClass('modal-show');
        }, 300);
    };

    // Help with size

    // Converting size properties into JSON list
    // const formBtn = document.querySelector('#helpBtn'),
    //       formSize = document.querySelector('#formSize');

    // formBtn.addEventListener('click', function() {
    //     let inputBust = document.querySelector('.input--bust'),
    //         inputWaist = document.querySelector('.input--waist'),
    //         inputHips = document.querySelector('.input--hips');

    //     function formSize(obj) {
    //         this.bust = obj.bust;
    //         this.waist = obj.waist;
    //         this.hips = obj.hips;
    //     }

    //     let bust = inputBust.value,
    //         waist = inputWaist.value,
    //         hips = inputHips.value;

    //     let sizes = new formSize({
    //         bust: bust,
    //         waist: waist,
    //         hips: hips
    //     });

    //     console.log(JSON.stringify(sizes));
        
    // });

    // Function to convert html table into json data

    // function tableToJson(table) {
    //     let data = [];
    
    //     // first row needs to be headers
    //     let headers = [];
    //     for (let i=0; i<table.rows[0].cells.length; i++) {
    //         headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi,'');
    //     }
    
    //     // go through cells
    //     for (let i=1; i<table.rows.length; i++) {
    
    //         let tableRow = table.rows[i];
    //         let rowData = {};
    
    //         for (let j=0; j<tableRow.cells.length; j++) {
    
    //             rowData[ headers[j] ] = tableRow.cells[j].innerHTML;
    
    //         }
    
    //         data.push(rowData);
    //     }       
    
    //     return data;
    // }

    // let sizeTable = JSON.stringify(tableToJson(document.querySelector('.sizetable')));

    // function downloadObject(exportOdbj, exportName) {
    //     let dataStr = "data: text/json;charset=utf-8," + encodeURIComponent(exportOdbj);
    //     let downloadAnchor = document.createElement('a');
    //     downloadAnchor.setAttribute("href", dataStr);
    //     downloadAnchor.setAttribute("download", exportName + ".json");
    //     document.body.appendChild(downloadAnchor);
    //     downloadAnchor.click();
    //     downloadAnchor.remove();
    // }

    // document.querySelector('.help__btn-size').onclick = function() {
    //     downloadObject(sizeTable, 'sizetable');
    // }

    
});
