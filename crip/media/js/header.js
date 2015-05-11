require([
    'jquery',
    'backbone',
], function($, Backbone, arches, ConceptModel, ConceptTree, ConceptReport, ConceptSearch, AddSchemeForm, ExportSchemeForm, DeleteSchemeForm, ImportSchemeForm) {
    
    function showHelp() {
        $("#help-button").click(function(){
            
            if ($("#help-contents").is(':visible') {
                $("#help-contents").hide();
            } else {
                $("#help-contents").show();
            });
        });
    };

    $(document).ready(function() {
        showHelp()
    });
});