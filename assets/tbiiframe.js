var frame;
var shopdomain = "http://www.thebolditalic.com/shop";
var path = window.location.pathname;

if (self==top) {
    // Make sure that we're in the iframe on TBI.com.  If not, take us there...
    window.location = shopdomain + path;
} else { 
    // set domain so that cross-iframe scripting works.
    document.domain = 'thebolditalic.com';

    frame = parent.document.getElementById("shopify_iframe");

    frame.setAttribute("frameBorder","0"); // Get rid of that pesky iframe border ASAP!

    function growParent() {
        $(frame).height($(".wrapper").height());
    }

    function fixURL() {
    // Make sure the parent location is proper:
        var pathindex = parent.location.pathname.indexOf(path);
        if (pathindex < 0 && path.length > 1) {
            if (Modernizr.history) {
                parent.history.replaceState("","","/shop"+path);
            } else {
                parent.location.hash = path;
            }
        }
        else if (path == "/" && Modernizr.history) {
            parent.history.replaceState("","","/shop");
        }
    }
}


$(document).ready(function(){
    $(frame).css("border","0"); // Double check that frame border...
    fixURL();
    growParent();
    $("a").click(growParent);
});

