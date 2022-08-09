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
        slidesToScroll: 1,
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

    const cartDomElement = document.querySelector('.js-cart');

    if(!cartDomElement) {
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const cartItemsCounterDOMElement = document.querySelector('.js-cart-total-count-items');        
    const cartTotalPriceDOMElement = document.querySelector('.js-cart-total-price');
    const cartTotalPriceInputDOMElement = document.querySelector('.js-cart-total-price-input');

    const renderCartItem = ({id, name, attribute, src, price, quantity}) => {
        const cartItemDOMElement = document.createElement('div');

        const attributeTemplate = attribute 
        ? ` <p name="1-Размер" class="cart__item-attribute">EU: ${attribute}</p> <input type="hidden" name="${id}-Аттрибут" value="${attribute}"> ` 
        : '';

        const cartItemTemplate = `
            <div class="cart-item cart__item">
            <div class="cart__item-main d-flex justify-content-center flex-wrap align-items-center">
                <div class="col-md-3">
                    <div class="cart__item-start">
                        <button type="button" class="cart__item-btn cart__item-btn--remove js-btn-cart__item-remove">Remove</button>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="cart__item-img-wrapper">
                        <img src="${src}" alt="" class="cart__item-img">
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="cart__item-descr d-flex justify-content-center align-items-center">
                        <div class="cart__item-title"><span class="cart__item-title-name">${name}</span></div>
                        <input type="hidden" name="${id}-Товар" value="${name}">
                        <input type="hidden" name="${id}-Количество" value="${quantity}">
                        <input type="hidden" name="${id}-Цена" value="${price * quantity}">
                        ${attributeTemplate}
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="cart__item-end">
                        <div class="cart__item-actions d-flex flex-nowrap align-items-center justify-content-center">
                            <button type="button" class="cart__item-btn-minus js-btn-product-dec-quantity"><img src="icons/minus.svg" alt=""></button>
                            <span class="cart__item-quantity js-cart__item-quantity">${quantity}</span>
                            <button type="button" class="cart__item-btn-plus js-btn-product-inc-quantity"><img src="icons/plus.svg" alt=""></button>
                            <div class="cart__item-price"><span class="js-cart__item-price">${price * quantity}</span>&#8364</div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        `;

        cartItemDOMElement.innerHTML = cartItemTemplate;
        cartItemDOMElement.setAttribute('data-product-id', id);
        cartItemDOMElement.classList.add('js-cart-item');
        cartDomElement.appendChild(cartItemDOMElement);
    };

    saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const updateCartTotalPrice = () => {
        const totalPrice = Object.keys(cart).reduce((acc, id) => {
            const {quantity, price} = cart[id];
            return acc + price * quantity;
        }, 0);

        if (cartTotalPriceDOMElement) {
            cartTotalPriceDOMElement.textContent = totalPrice;
        }

        if (cartTotalPriceDOMElement) {
            cartTotalPriceInputDOMElement.value = totalPrice;
        }
    }

    const updateCartTotalItemsCounter = () => {
        const totalQuantity = Object.keys(cart).reduce((acc, id) => {
            const {quantity} = cart[id];
            return acc + quantity;
        }, 0);

        if (cartItemsCounterDOMElement) {
            cartItemsCounterDOMElement.textContent = totalQuantity;
        }
    }

    const updateCart = () => {
        console.log(cart);
        updateCartTotalPrice();
        updateCartTotalItemsCounter();
        saveCart();
    };

    const deleteCartItem = (id) => {
        const cartItemDOMElement = cartDomElement.querySelector(`[data-product-id="${id}"]`);

        cartDomElement.removeChild(cartItemDOMElement);
        delete cart[id];
        updateCart();
    };

    const addCartItem = (data) => {
        const {id} = data;

        if (cart[id]) {
            incQuantity(id);
            return;
        }

        cart[id] = data;
        renderCartItem(data);
        updateCart();
    };

    const updateQuantity = (id, quantity) => {
        const cartItemDOMElement = cartDomElement.querySelector(`[data-product-id="${id}"]`);
        const cartItemQuantityDOMElement = cartItemDOMElement.querySelector('.js-cart__item-quantity');
        const cartItemPriceDOMElement = cartItemDOMElement.querySelector('.js-cart__item-price');

        cart[id].quantity = quantity;
        cartItemQuantityDOMElement.textContent = quantity;
        cartItemPriceDOMElement.textContent = quantity * cart[id].price;

        updateCart();
    }

    const decQuantity = (id) => {
        const newQuantity = cart[id].quantity - 1;
        if (newQuantity >= 1) {
            updateQuantity(id, newQuantity);
        }
    }

    const incQuantity = (id) => {
        const newQuantity = cart[id].quantity + 1;
        
        updateQuantity(id, newQuantity);
    }

    const generateID = (string1, string2) => {
        const secondParam = string2 ? `-${string2}` : '';
        return `${string1}${secondParam}`.replace(/ /g, '-');
    };

    const getProductData = (productDOMElement) => {
        const name = productDOMElement.getAttribute('data-product-name');
                const attribute = productDOMElement.getAttribute('data-product-attribute');
                const price = productDOMElement.getAttribute('data-product-price');
                const src = productDOMElement.getAttribute('data-product-src');
                const quantity = 1;
                const id = generateID(name, attribute);

        return { name, attribute, price, src, quantity, id };
    };

    const renderCart = () => {
        const ids = Object.keys(cart);
        ids.forEach((id) => renderCartItem(cart[id]));
    }

    const cartInit = () => {
        renderCart();
        updateCart();

        document.querySelector('body').addEventListener('click', (e) => {
            const target = e.target;

            if (target.classList.contains('js-btn-add-to-cart')) {
                e.preventDefault();
                const productDOMElement = target.closest('.js-product');
                const data = getProductData(productDOMElement);
                addCartItem(data);
            }

            if (target.classList.contains('js-btn-cart__item-remove')) {
                e.preventDefault();
                const cartItemDOMElement = target.closest('.js-cart-item');
                const productID = cartItemDOMElement.getAttribute('data-product-id');
                deleteCartItem(productID);
            }

            if (target.classList.contains('js-btn-product-inc-quantity')) {
                e.preventDefault();
                const cartItemDOMElement = target.closest('.js-cart-item');
                const productID = cartItemDOMElement.getAttribute('data-product-id');
                incQuantity(productID);
            }

            if (target.classList.contains('js-btn-product-dec-quantity')) {
                e.preventDefault();
                const cartItemDOMElement = target.closest('.js-cart-item');
                const productID = cartItemDOMElement.getAttribute('data-product-id');
                decQuantity(productID);
            }

            if (target.classList.contains('js-btn-product-attribute')) {
                e.preventDefault();
                const attribute = target.getAttribute('data-product-attribute-value');
                const price = target.getAttribute('data-product-attribute-price');
                const productDOMElement = target.closest('.js-product');
                const activeAttributeDOMElement = productDOMElement.querySelector('.js-btn-product-attribute.size-active');
                const productPriceDOMElement = productDOMElement.querySelector('.js-catalog__price-value');
                const productChooseAttributeDOMElement = productDOMElement.querySelector('.js-product-attribute');

                productPriceDOMElement.textContent = price;
                productDOMElement.setAttribute('data-product-attribute', attribute);
                productDOMElement.setAttribute('data-product-price', price);
                activeAttributeDOMElement.classList.remove('size-active');
                target.classList.add('size-active');
                productChooseAttributeDOMElement.textContent = `(EU): ${attribute}`;

            }
        });
    };

    cartInit();

});

AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    
  
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  
  });
