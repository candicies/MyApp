(function($){
	
	var min_version = [1,0,5];
	 
    function check_version(min) {
        var vlc, descr = "";
        if ($.browser.msie) {
        	try{
        		vlc = new ActiveXObject("VideoLAN.VLCPlugin.2");
        	}catch(e){
        		try{
        			vlc = new ActiveXObject("VideoLAN.VLCPlugin");
        		}catch(e2){
        			return false;
        		}
        	}
            if (vlc){
                descr = vlc.VersionInfo;
            }
        } else {
        	if(navigator.plugins && navigator.mimeTypes.length){		
				for(var i=0;i<navigator.plugins.length;++i){
					if (navigator.plugins[i].name.indexOf('VLC') != -1) {
						vlc = navigator.plugins[i];
					}
				}
			}
            //vlc = navigator.plugins["VLC Multimedia Plug-in"];
            if (vlc && vlc.description) {
                	descr = vlc.description;
            }
        }
        if (descr) {
            var res = descr.match(/(\d+).(\d+).(\d+)([^ ]*)/);

            if (min[0] > res[1] && min[1] > res[2] && min[2] > res[3]) {
                return false;
            } else
                return true;
        } else
            return false
    }
    function autoinstall(o, t) {
        os = navigator.platform.split(" ")[0];
        plugin_url = false;
        if ($.browser.safari &&
            navigator.userAgent.match("Chrome") &&
            o.chrome_crx ) {
            plugin_url = o.chrome_crx;
        }
        if ($.browser.mozilla &&
            navigator.userAgent.match("Firefox") &&
            o.firefox_xpi) {
            plugin_url = o.firefox_xpi;
        }
        if (plugin_url) {
            window.open(plugin_url);
        } else {
            t.each(function() {
                e = $(this);
                e.html("No VLC plugin found. please install one from the "+
                       '<a href="http://videolan.org">VideoLAN</a> website.');
                e.addClass('warning');
            });
        }
    }
    $.expr[":"].vlc = function(elem) {
        return !!elem.VersionInfo;
    }
    
    $.fn.vlc = function(options) {
        if (typeof options == 'string' && options == "remove") {
            this.each(function() {
                // we need to stop vlc before removing otherwise
                // _something_quite_bad_ will happen
                $(this).remove();
            });
        }
        var defaults = {
            min_version: min_version,
            width: "auto",
            height: "auto",
            fallback: "Plugin not found",
            fallback_action: autoinstall,
            chrome_crx: false,
            firefox_xpi: false,
            base_url: false,
            toolbar:false
        };
        var opt = $.extend(defaults, options);

        if (check_version(opt.min_version)) {
            this.each(function(){
                e = $(this);
                embed = $("<object/>");
                embed.attr('id',opt.id);
                embed.width(opt.width);
                embed.height(opt.height);
                embed.attr('toolbar',opt.toolbar);
                //embed.attr("events", "True");

                if ($.browser.msie) {
                    embed.attr("classid","clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921");
                } else {
                    embed.attr("type","application/x-vlc-plugin");
                }
                e.html(embed);
                if ($.browser.msie) {
                    embed.width(opt.width);
                    embed.height(opt.height);
                }
            });
        } else autoinstall(opt, this);

        return this;
    };
    
    function detectVLCPlugin(){
    	return check_version(min_version);
    }
    
    $.extend({ 
    	detectVLCPlugin : detectVLCPlugin
    });
})(jQuery);