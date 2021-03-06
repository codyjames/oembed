/**
 * oEmbed plugin for Craft CMS
 *
 * oEmbed JS
 *
 * @author    reganlawton
 * @copyright Copyright (c) 2017 reganlawton
 * @link      https://github.com/wrav
 * @package   oEmbed
 * @since     1.0.0
 */

var oembedOnChangeTimeout = null;

$('body').on('click', '.oembed-header', function () {
    var oembedPreview = $(this).parent().find('.oembed-preview');
    var icon = $(this).parent().find('.oembed-header *[data-icon-after]');

    oembedPreview.toggleClass('expanded');

    if(oembedPreview.hasClass('expanded')) {
        icon.attr('data-icon-after', 'collapse')
    } else {
        icon.attr('data-icon-after', 'expand')
    }
});

$('body').on('keyup blur change', 'input.oembed-field', function () {
    var that = $(this);

    if (oembedOnChangeTimeout != null) {
        clearTimeout(oembedOnChangeTimeout);
    }

    oembedOnChangeTimeout = setTimeout(function() {
        oembedOnChangeTimeout = null;

        var val = that.val();
        var cpTrigger = Craft && Craft.cpTrigger ? Craft.cpTrigger : 'admin';

        if(val) {
            var preview = that.parent().find('.oembed-preview');
            preview.removeClass('has-embed').html(
                '<p>Loading...</p>'
            );

            $.ajax({
                type: "GET",
                url: "/"+cpTrigger.toString()+"/oembed/preview?url=" + val + "&options[]=",
                async: true
            }).done(function (res) {
                if (res) {
                    preview.addClass('has-embed expanded').html(res);
                } else {
                    preview.removeClass('has-embed').html(
                        '<p class="error">Please check your URL.</p>'
                    );
                }
            });
        }

    }, 500);
});
