/*
 * Copyright ©2016 VidGrid, Inc.
 */

//var CKEDITOR = CKEDITOR || {};
var ckeditorId;
(function() {
    var orgApiKey = 'YOUR ORG API KEY'; //You can find your API key in
    var pluginName = 'vidgrid';
    var serverPath = 'https://app.vidgrid.com/lti/embed';
    var pageUrl = window.location.protocol + "//" + window.location.host;
    var returnUrl = pageUrl+'/imsblis/service/return-url/site/'+parent.portal.siteId;

    var launchUrl =  serverPath+'?oauth_consumer_key='+orgApiKey+'&launch_presentation_return_url='+encodeURI(returnUrl)
        +"&tool_consumer_info_product_family_code=sakai";

    CKEDITOR.plugins.add(pluginName,
        {
            init: function(editor) {

                ckeditorId = editor.name;
                var height = 480;
                var width = 770;
                CKEDITOR.dialog.addIframe(pluginName,
                    'vidgrid',
                    launchUrl,
                    width,
                    height,
                    function() {
                        var ckDialog = CKEDITOR.dialog.getCurrent();
                        if (ckDialog) {
                            document.getElementById(ckDialog.getButton('ok').domId).style.display='none';
                            document.getElementById(ckDialog.getButton('cancel').domId).style.display='none';
                        }

                        var $iframeEl = document.getElementById( this._.frameId );
                        var $innerIframe = $iframeEl.contentDocument;

                        var $url = $innerIframe.getElementsByTagName("p")[0].innerHTML;

                        if ($url.includes("vidgrid") >= 0)
                        {
                            $url = $url.replace("External tool has finished: ", "");

                            var $iframe = '<iframe allowfullscreen="" frameborder="0" height="315"'
                                + ' src="'+$url+'" width="560"></iframe>';
                            editor.insertHtml($iframe);
                            CKEDITOR.dialog.getCurrent().hide();
                        }
                    }
                );
                editor.addCommand(pluginName, new CKEDITOR.dialogCommand( 'vidgrid' ) );

                editor.ui.addButton(pluginName, {
                    label: pluginName,
                    command: pluginName,
                    icon: 'https://s3.amazonaws.com/ilos-public-assets/vidgrid/favicon-16x16.png'
                });
            }
        }
    );

})();