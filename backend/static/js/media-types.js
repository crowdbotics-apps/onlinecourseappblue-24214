(function($) {
    $(document).ready(function(){
        $('.module[id^=module] .row').hide();
        $('.module[id^=module] .row.module').show();
        $('.module[id^=module] .row.module select').each(function(){
            if ($(this).val() != '')
            {
                var group = $(this).parent().parent().parent().parent();
                var field = $(this).parent().parent().parent();
                var mtype = $(this).val().toLowerCase();
                if (mtype != '')
                {
                    $('.row', group).not(field).slideUp('fast');
                    $('.row[class*="'+mtype+'"]', group).slideDown('fast');
                    $('.row[class*="all"]', group).slideDown('fast');
                }
                else
                {
                    $('.row', group).not(field).slideUp('fast');
                }
            }
        });
        $('.module[id^=module] .row.module select').change(function(){
            var group = $(this).parent().parent().parent().parent();
            var field = $(this).parent().parent().parent();
            var mtype = $(this).val().toLowerCase();
            if (mtype != '')
            {
                $('.row', group).not(field).slideUp('fast');
                $('.row[class*="'+mtype+'"]', group).slideDown('fast');
                $('.row[class*="all"]', group).slideDown('fast');
            }
            else
            {
                $('.row', group).not(field).slideUp('fast');
            }
        });
    });
})(django.jQuery);