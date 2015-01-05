/*
 * Dynamic ajax form
 * Author: Leon Harvey
 * Usage
 * <form action="process.php" method="POST" class="ajaxSubmit">
 * 
 */
 var ajaxIdentifier;
 
// Form Submission hook
$('.ajaxSubmit').submit(function(e) { 
    e.preventDefault();
    ajaxIdentifier = $(this);
    submitForm();
});

// Form change hook
$(document).on('change', '.ajaxChange', function() { 
    ajaxIdentifier = $(this);
    submitForm();
});


function submitForm() {
    if ((!ajaxIdentifier.attr('data-before') || window[ajaxIdentifier.attr('data-before')](ajaxIdentifier))) {
        var form_data, process_data, content_type;
        
        runPlugins('before')
        
        if (ajaxIdentifier.attr('data-upload') == 'true') {
            form_data    = new FormData(ajaxIdentifier[0]);
            process_data = false;
            content_type = false;
        } else {
            form_data    = ajaxIdentifier.serialize();
            process_data = false;
            content_type = 'application/x-www-form-urlencoded; charset=UTF-8';
        }
    
        $.ajax({
            url:         ajaxIdentifier.attr('action'),
            type:        ajaxIdentifier.attr('method'),
            data:        form_data,
            processData: process_data,
            contentType: content_type,
            success:     window[ajaxIdentifier.attr('data-after')]
        }).done(function(data) {
            
            if (ajaxIdentifier.attr('data-return')) {
                $.when(
                    $(ajaxIdentifier.attr('data-return')).html(data)
                ).then(function() {
                    runPlugins('after', data);
                });
            };
            
            if (ajaxIdentifier.attr('data-append')) {
                $.when(
                    $(ajaxIdentifier.attr('data-append')).append(data)
                ).then(function() {
                    runPlugins('after', data);
                });
            };
        });
    }
}

function runPlugins(type, data) {
    try {
        var options  = ajaxIdentifier.attr('data-plugins').split('|');
    
        $.each(options, function(key, value) {
            window['ajaxPlugin_' + value + '_' + type](data, ajaxIdentifier);
        });
    } catch(e) {}
}

function ajaxPlugin_fadeIn_after(data, ajaxIdentifier) {
    if (ajaxIdentifier.attr('data-return')) 
        $(ajaxIdentifier.attr('data-return')).fadeIn('fast');
        
    if (ajaxIdentifier.attr('data-append')) 
        $(ajaxIdentifier.attr('data-append')).fadeIn('fast');
}

function ajaxPlugin_slideIn_after(data, ajaxIdentifier) {
    if (ajaxIdentifier.attr('data-return')) 
        $(ajaxIdentifier.attr('data-return')).slideIn('fast');
        
    if (ajaxIdentifier.attr('data-append')) 
        $(ajaxIdentifier.attr('data-append')).slideIn('fast');
}


