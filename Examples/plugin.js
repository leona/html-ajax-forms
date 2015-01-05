function ajaxPlugin_fadeIn_after(null, identifier) {
    if (identifier.attr('data-return'))
        $(identifier.attr('data-return')).fadeIn('fast');

    if (identifier.attr('data-append'))
        $(identifier.attr('data-append')).fadeIn('fast');
}
