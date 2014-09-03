

function getFrameID(id){
    var elem = document.getElementById(id);
    if (elem) {
        if(/^iframe$/i.test(elem.tagName)) return id; //Frame, OK
        // else: Look for frame
        var elems = elem.getElementsByTagName("iframe");
        if (!elems.length) return null; //No iframe found, FAILURE
        for (var i=0; i<elems.length; i++) {
           if (/^https?:\/\/(?:www\.)?youtube(?:-nocookie)?\.com(\/|$)/i.test(elems[i].src)) break;
        }
        elem = elems[i]; //The only, or the best iFrame
        if (elem.id) return elem.id; //Existing ID, return it
        // else: Create a new ID
        do { //Keep postfixing `-frame` until the ID is unique
            id += "-frame";
        } while (document.getElementById(id));
        elem.id = id;
        return id;
    }
    // If no element, return null.
    return null;
}

// Define YT_ready function.
var YT_ready = (function() {
    var onReady_funcs = [], api_isReady = false;
    /* @param func function     Function to execute on ready
     * @param func Boolean      If true, all qeued functions are executed
     * @param b_before Boolean  If true, the func will added to the first
                                 position in the queue*/
    return function(func, b_before) {
        if (func === true) {
            api_isReady = true;
            while (onReady_funcs.length) {
                // Removes the first func from the array, and execute func
                onReady_funcs.shift()();
            }
        } else if (typeof func == "function") {
            if (api_isReady) func();
            else onReady_funcs[b_before?"unshift":"push"](func); 
        }
    }
})();
// This function will be called when the API is fully loaded
function onYouTubePlayerAPIReady() {YT_ready(true)}

// Load YouTube Frame API
(function() { // Closure, to not leak to the scope
  var s = document.createElement("script");
  s.src = (location.protocol == 'https:' ? 'https' : 'http') + "://www.youtube.com/player_api";
  var before = document.getElementsByTagName("script")[0];
  before.parentNode.insertBefore(s, before);
})();
var player; //Define a player object, to enable later function calls, without
            // having to create a new class instance again.

// Add function to execute when the API is ready
YT_ready(function(){
    var frameID = getFrameID("home");
    if (frameID) { //If the frame exists
        player = new YT.Player(frameID, {
            events: {
                "onStateChange": stopCycle
            }
        });

    }
    $("#play-icon").toggle();
});

function stopCycle(event) {
    if(event.data === 2 && player.getCurrentTime() > 34) {
        $("#video").toggle();  
        $("#slideshow").fadeToggle(3000, function (){
            $("#text").delay(00).fadeToggle(300);
        });
        $("li").removeClass("li-video-playing");
        $("li").addClass("on-images");
        $("#ghost").removeClass("dark-gray");
        $("#ghost").addClass("FFF");

        $("#breakfast").css('margin-left', -1 * $("#breakfast").width()/2 + 'px');
        $("#dinner").css('margin-left', -1 * $("#dinner").width()/2 + 'px');
        $("#cereal").css('margin-left', -1 * $("#cereal").width()/2 + 'px'); 
        $("#froyo").css('margin-left', -1 * $("#froyo").width()/2 + 'px');
        $("#baseball").css('margin-left', -1 * $("#baseball").width()/2 + 'px'); 
        $("#chilling").css('margin-left', -1 * $("#chilling").width()/2 + 'px');
        $("#graduation").css('margin-left', -1 * $("#graduation").width()/2 + 'px'); 
        $("#teeth").css('margin-left', -1 * $("#teeth").width()/2 + 'px');
        

        $("#dinner").css('margin-top', -1 * $("#dinner").height()/2 + 'px');
        $("#breakfast").css('margin-top', -1 * $("#breakfast").height()/2 + 'px');
        $("#cereal").css('margin-top', -1 * $("#cereal").height()/2 + 'px'); 
        $("#froyo").css('margin-top', -1 * $("#froyo").height()/2 + 'px');
        $("#baseball").css('margin-top', -1 * $("#baseball").height()/2 + 'px'); 
        $("#chilling").css('margin-top', -1 * $("#chilling").height()/2 + 'px');
        $("#graduation").css('margin-top', -1 * $("#graduation").height()/2 + 'px'); 
        $("#teeth").css('margin-top', -1 * $("#teeth").height()/2 + 'px');
    }
};


$( document ).ready(function() {
    if (/mobile/i.test(navigator.userAgent)) {
        $("#home").prepend('<div id="m-background"><div id="m-chat"></div></div>');
        $("footer").addClass("mobile-footer");
        $("#home").css('background-color', '#FFFC00');
        $("#list").prepend('<li><a href="http://blog.snapchat.com/post/84407744185/putting-the-chat-into-snapchat">READ MORE</a></li>');
        $("#ghost").toggle();
                    var ua = navigator.userAgent.toLowerCase();
            var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
            if(isAndroid) {
                $("#download").click(function() {
                    var ua = navigator.userAgent.toLowerCase();
                    var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
                    if(isAndroid) {
                        window.open('');
                    }
                    // else {
                    //     window.open('https://itunes.apple.com/us/app/vine/id592447445?mt=8&uo=4&at=10lmBm&ct=Vine_Homepage_Download');
                    // }
                });
            }
            else {
                 $("#download-href").attr('href', 'https://itunes.apple.com/us/app/hashtack/id591758119?mt=8');
            }


        $("#m-chat").click(function() {
            var ua = navigator.userAgent.toLowerCase();
            var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
            if(isAndroid) {
                window.open('https://www.youtube.com/watch?v=Z9h30NcVy4E');
            }
            else {
                window.open('https://m.youtube.com/watch?v=Z9h30NcVy4E&app=m&persist_app=1');
            }
        });

    }
    else {
        $("#home").addClass("desktop-body");
        $("footer").addClass("desktop-footer");
        $("body").append('<iframe id="video" src="https://www.youtube.com/embed/Z9h30NcVy4E?enablejsapi=1&wmode=opaque&bq=hd1080&rel=0&autohide=1&showinfo=0&controls=0&html5=0" frameborder="0" allowfullscreen></iframe><div id="slideshow" class="hide"><img src="static/assets/breakfast.jpg" class="bgM" id="breakfast"/><img src="static/assets/cereooooo.jpg" class="bgM" id="cereal"/><img src="static/assets/froyooo.jpg" class="bgM" id="froyo"/><img src="static/assets/teethies.jpg" class="bgM" id="teeth"/><img src="static/assets/graduation.jpg" class="bgM" id="graduation"/><img src="static/assets/chilling.jpg" class="bgM" id="chilling"/><img src="static/assets/baseball.jpg" class="bgM" id="baseball"/><img src="static/assets/dinner.jpg" class="bgM" id="dinner"/></div><div id="text" style="display:none;"><a href="http://blog.snapchat.com/post/84407744185/putting-the-chat-into-snapchat">Read More</a></div><div id="wrapper"><div id="chat-icon-smaller"><div id="play-icon" class="hide"></div></div></div>');
        $('#video').css({ width: $(window).innerWidth() + 'px', height: $(window).innerHeight() + 'px' });
        $("#download").click(function(){
            $("body").append('<div id="download-modal"><div id="ios"></div><div id="google"></div></div>');
            $("#ios").click(function(){
                window.open('https://itunes.apple.com/us/app/snapchat/id447188370?mt=8');
            });
            $("#google").click(function(){
                window.open('https://play.google.com/store/apps/details?id=com.snapchat.android');
            });

        });
        var ghost = $('#ghost');
        ghost.click(function() {
            window.location.href = "http://www.snapchat.com";
        });

        var myButton = $('#chat-icon-smaller');
        myButton.click(function () {
            player.playVideo();
            myButton.fadeToggle("fast", function(){
                $("#wrapper").fadeToggle("fast"); 
                $("footer").addClass("video-playing");
                $("li").addClass("li-video-playing");
                $("#ghost").removeClass("black");
                $("#ghost").addClass("dark-gray");
            });
        });

        $(window).resize(function() {
            $('#video').css({ width: $(window).innerWidth() + 'px', height: $(window).innerHeight() + 'px' });

            $("#dinner").css('margin-left', -1 * $("#dinner").width()/2 + 'px'); 
            $("#breakfast").css('margin-left', -1 * $("#breakfast").width()/2 + 'px');
            $("#cereal").css('margin-left', -1 * $("#cereal").width()/2 + 'px'); 
            $("#froyo").css('margin-left', -1 * $("#froyo").width()/2 + 'px');
            $("#baseball").css('margin-left', -1 * $("#baseball").width()/2 + 'px'); 
            $("#chilling").css('margin-left', -1 * $("#chilling").width()/2 + 'px');
            $("#graduation").css('margin-left', -1 * $("#graduation").width()/2 + 'px');
            $("#teeth").css('margin-left', -1 * $("#teeth").width()/2 + 'px');

            $("#dinner").css('margin-top', -1 * $("#dinner").height()/2 + 'px'); 
            $("#breakfast").css('margin-top', -1 * $("#breakfast").height()/2 + 'px');   
            $("#cereal").css('margin-top', -1 * $("#cereal").height()/2 + 'px'); 
            $("#froyo").css('margin-top', -1 * $("#froyo").height()/2 + 'px'); 
            $("#baseball").css('margin-top', -1 * $("#baseball").height()/2 + 'px'); 
            $("#chilling").css('margin-top', -1 * $("#chilling").height()/2 + 'px');   
            $("#graduation").css('margin-top', -1 * $("#graduation").height()/2 + 'px'); 
            $("#teeth").css('margin-top', -1 * $("#teeth").height()/2 + 'px');   
        });

        $('#slideshow').cycle({
            fx: 'fade',
            pager: '#smallnav', 
            pause:   1, 
            speed: 1800,
            timeout:  3500 
        });
    }
});
