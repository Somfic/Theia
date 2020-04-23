$(window).on('scroll', () => {
    if($(window).scrollTop() > 20) {
        $('nav').addClass('scrolled');
    } else {
        $('nav').removeClass('scrolled');
    }
});