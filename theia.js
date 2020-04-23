$(window).on('scroll', () => {
    if($(window).scrollTop() > 20) {
        $('nav').addClass('scrolled');
    } else {
        $('nav').removeClass('scrolled');
    }
});

$('input').keypress(() => {
    $(this).parent().removeClass('error');
    $(this).parent().removeClass('success');
});