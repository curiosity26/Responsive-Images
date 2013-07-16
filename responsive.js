/**
 * Created with JetBrains PhpStorm.
 * User: alexboyce (curiosity26)
 * Date: 7/12/13
 * Time: 11:40 AM
 * License: GPLv2
 */
(function() {
    var pR;
    var errorCatch = function() {
        if (document.querySelectorAll) {
            var images = document.querySelectorAll("img[data-src]");
            (function() {
                for (var i = 0; i < images.length; i++) {
                    var image = images[i];
                    var src = image.getAttribute("data-src");
                    if (src) {
                        image.src = src;
                    }
                }
            })();
        }
        else {
            (function() {
                for (var i = 0; i < document.images.length; i++) {
                    var image = document.images[i];
                    var src = image.getAttribute("data-src");
                    if (src) {
                        image.src = src;
                    }
                }
            })();
        }
    };
    
    try {
        var ResponsiveImage = function(src) {
            var tmpImage = new Image();
            var img = this.img = document.querySelector("img[data-src='" + src + "']");
            tmpImage.onload = function() {
                var ext = tmpImage.src.match(/\.([^\.]+)$/)[1] ? tmpImage.src.match(/\.([^\.]+)$/)[1].toLowerCase() : null;
                if (ext == "svg") {
                    return;
                }
                try {
                    var canvas = document.createElement("canvas");
                    var context = canvas.getContext('2d');
                    var aspect = tmpImage.height / tmpImage.width;
                    if (tmpImage.width > window.outerWidth * pR || pR > 1) {
                        var width = img.getAttribute("width") ? Math.min(img.getAttribute("width"), tmpImage.width, window.outerWidth) * pR : Math.min(tmpImage.width, window.outerWidth) * pR;
                        var height = width * aspect;
                        var mime = "image/" + (ext.replace('jpg', 'jpeg'));
                        canvas.setAttribute("width", width);
                        canvas.setAttribute("height", height);
                        context.save();
                        context.drawImage(tmpImage, 0, 0, width, height);
                        context.restore();
                        img.removeAttribute("data-src");
                        
                        var url;
                        if (pR > 1 && canvas.toDataURLHD) {
                            if (ext.replace('jpg', 'jpeg') == 'jpg') {
                                url = canvas.toDataURLHD(mime, .5);
                            }
                            else {
                                url = canvas.toDataURLHD(mime);
                            }
                        }
                        else {
                            if (pR > 1 && ext.replace('jpg', 'jpeg') == 'jpg') {
                                url = canvas.toDataURL(mime, .5);
                            }
                            else {
                                url = canvas.toDataURL(mime);
                            }
                        }
                        img.src = url;
                        
                    }
                    else {
                        img.src = tmpImage.src;
                    }
                } catch(e) {
                    img.src = src;
                }
                
            };
            tmpImage.src = src;
        };
        
        pR = window.devicePixelRatio || window.webkitDevicePixelRatio || window.mozDevicePixelRatio || window.msDevicePixelRatio || window.oDevicePixelRatio || 1;
        var canvas;
        var imgsLoaded = [];
        try {
            if (pR && (canvas = document.createElement("canvas"))) {
                (function() {
                    var images = document.querySelectorAll("img[data-src]");   
                    for (var i = 0; i < images.length; i++) {
                        imgsLoaded.push(new ResponsiveImage(images[i].getAttribute("data-src")));
                    }
                })();
            }
            else {
                errorCatch();
            }
        } catch(e) {
            errorCatch();
        }
    }
    catch(e) {
        errorCatch();
    }
})();
