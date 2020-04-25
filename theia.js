$(window).on('scroll', () => {
    if($(window).scrollTop() > 20) {
        $('nav').addClass('scrolled');
    } else {
        $('nav').removeClass('scrolled');
    }
});

$('input').keyup((e) => {
    var input = $(e.target);
    input.parent().removeClass('error');
    input.parent().removeClass('success');
});