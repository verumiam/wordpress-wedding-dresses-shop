window.addEventListener('DOMContentLoaded', () => {
    const animation = bodymovin.loadAnimation({
        container: document.querySelector('#container'),
        rederer: 'svg',
        loop: false,
        autoplay: true,
        path: 'js/data2.json'
    });
});
