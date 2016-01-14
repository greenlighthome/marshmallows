var scrollFunction = function(idstring) {
    $('html, body').animate({
        scrollTop: $(idstring).offset().top
    }, 1000);
};

