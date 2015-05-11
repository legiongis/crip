require([
    'jquery',
    'backbone',
], function($, Backbone, arches, ConceptModel, ConceptTree, ConceptReport, ConceptSearch, AddSchemeForm, ExportSchemeForm, DeleteSchemeForm, ImportSchemeForm) {
    
    function showHelp() {
        $("#help-button").click(function(){
            
            if ($("#help-contents").is(':visible') {
                $("#help-contents").hide();
                console.log("hide");
            } else {
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