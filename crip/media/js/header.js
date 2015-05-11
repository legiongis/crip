require([
    'jquery',
    'backbone',
], function($, Backbone, arches) {
    console.log("first print");
    function showHelp() {
        $("#help-button").click(function(){
            if (this.hasClass("help-shown")){
                $(this).removeClass("help-shown");
                $(this).text("SHOW HELP");
                $("#help-contents").hide();
                console.log("hide");
            } else {
                $(this).addClass("help-shown");
                $(this).text("HIDE HELP");
                $("#help-contents").show();
                console.log("show");
            });
        });
    };
    
    $(document).ready(function() {
    
        console.log("document ready");
        showHelp()
    });
});