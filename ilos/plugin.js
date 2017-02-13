/*
 * Copyright ©2016 Kaltura, Inc.
 */

//var CKEDITOR = CKEDITOR || {};
var ckeditorId;
(function() {
    var pluginName = 'ilos';
    CKEDITOR.plugins.add(pluginName,
        {
            init: function(editor) {

                ckeditorId = editor.name;
                var height = 480;
                var width = 770;
                CKEDITOR.dialog.addIframe(pluginName,
                    'Ilos Videos',
                    '/access/basiclti/site/'+parent.portal.siteId+'/content:1',
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

                        if ($url.includes("ilosvideos") >= 0)
                        {
                            $url = $url.replace("External tool has finished: ", "");

                            var $iframe = '<iframe allowfullscreen="" frameborder="0" height="315"'
                                + ' src="'+$url+'" width="560"></iframe>';
                            editor.insertHtml($iframe);
                            CKEDITOR.dialog.getCurrent().hide();
                        }
                    }
                );
                editor.addCommand(pluginName, new CKEDITOR.dialogCommand( 'ilos' ) );

                editor.ui.addButton(pluginName, {
                    label: pluginName,
                    command: pluginName,
                    icon: 'https://s3.amazonaws.com/ilos-public-assets/ilos_icon_16x_16.png'
                });
            }
        }
    );

})();