//Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(response => console.log('serviceWorker cargado correctamente', response))
        .catch(error => console.log('serviceWorker no se ha podido registrar', error));
}

//Scroll
$(function () {
    $('#menu a').click(function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        });

        return false;
    });
});