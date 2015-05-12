require([
    'jquery',
    'backbone',
], function($, Backbone, arches) {
    var help_on = false;
    function showHelp() {
        $("#help-button").click(function(){
            if (help_on == true){
                $("#help-contents").slideUp();
            } else {
                $("#help-contents").slideDown();
            }
            help_on = !help_on
        });
    };
    
    function hideHelp() {
        $("#hide-help-button").click(function(){
            $("#help-contents").slideUp();
            help_on = false
        });
    };
    
    $(document).ready(function() {
        hideHelp()
        showHelp()
    });
});