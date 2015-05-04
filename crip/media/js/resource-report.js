require([
    'jquery',
    'underscore',
    'arches',
    'bootstrap',
    'views/map',
    'openlayers',
    'knockout',
    'utils'
], function($, _, arches, bootstrap, MapView, ol, ko, utils) {
    var ReportView = Backbone.View.extend({

        initialize: function(options) { 
            var resize;
            var self = this;
            var resource_geometry = $('#resource_geometry');
            

            var geom = JSON.parse(resource_geometry.val());
            this.map = new MapView({
                el: $('#map')
            });

            ko.applyBindings(this.map, $('#basemaps-panel')[0]);
            ko.applyBindings(this.map, $('#historicmaps-panel')[0]);

            //this.highlightFeatures(JSON.parse(resource_geometry.val()));
            this.highlightFeatures();
            this.zoomToResource('1');
            
            var hideAllPanels = function(){
                $("#basemaps-panel").addClass("hidden");
                $("#historicmaps-panel").addClass("hidden");

                //Update state of buttons
                $("#inventory-basemaps").removeClass("arches-map-tools-pressed");
                $("#inventory-basemaps").addClass("arches-map-tools");
                $("#inventory-basemaps").css("border-bottom-left-radius", "1px");

                $("#inventory-historicmaps").removeClass("arches-map-tools-pressed");
                $("#inventory-historicmaps").addClass("arches-map-tools");
                $("#inventory-historicmaps").css("border-bottom-right-radius", "1px");
            };

            //Inventory-basemaps button opens basemap panel
            $("#inventory-basemaps").click(function (){
                if ($(this).hasClass('arches-map-tools-pressed')) {
                    hideAllPanels();
                } else {
                    $("#historicmaps-panel").addClass("hidden");
                    $("#basemaps-panel").removeClass("hidden");
                    
                    //Update state of remaining buttons
                    $("#inventory-historicmaps").removeClass("arches-map-tools-pressed");
                    $("#inventory-historicmaps").addClass("arches-map-tools");
                    
                    //Update state of current button and adjust position
                    $(this).addClass("arches-map-tools-pressed")
                    $(this).removeClass("arches-map-tools");
                }
            });
            
            $("#inventory-historicmaps").click(function (){
                if ($(this).hasClass('arches-map-tools-pressed')) {
                    hideAllPanels();
                } else {
                    $("#basemaps-panel").addClass("hidden");
                    $("#historicmaps-panel").removeClass("hidden");

                    //Update state of remaining buttons
                    $("#inventory-basemaps").removeClass("arches-map-tools-pressed");
                    $("#inventory-basemaps").addClass("arches-map-tools");

                    //Update state of current button
                    $(this).addClass("arches-map-tools-pressed");
                    $(this).removeClass("arches-map-tools");
                }
            });

            // activate single basemap when basemap is clicked, and remove basemap panel
            $(".basemap").click(function (){
                var basemap = $(this).attr('id');
                _.each(self.map.baseLayers, function(baseLayer){
                    baseLayer.layer.setVisible(basemap == baseLayer.id);
                    if (basemap == baseLayer.id){
                        $('#'+baseLayer.id).css("background","#eaeaea");

                    } else {
                        $('#'+baseLayer.id).css("background","");
                    }
                });
                hideAllPanels();
            });
            
            // activate historic map when button is clicked, stays on until clicked again
            // historic map panel doesn't close automatically
            $(".historicmap").click(function (){
                var historicmap = $(this).attr('id');
                self.selectHistoricMap(historicmap);
                // _.each(self.map.historicLayers, function(historicLayer){
                    // if (historicLayer.id == historicmap){
                        // historicLayer.layer.setVisible(!historicLayer.layer.getVisible());
                        
                        // if activated, set layer on top of all historic maps/basemaps
                        // also highlight layer button by changing background
                        // if (historicLayer.layer.getVisible() == true) {
                            // setlyrs = self.map.historicLayers.length + self.map.baseLayers.length;
                            
                            // self.map.map.removeLayer(historicLayer.layer);
                            // self.map.map.getLayers().insertAt(setlyrs, historicLayer.layer);
                            
                            // $('#'+historicLayer.id).css("background","#eaeaea");
                        // } else {
                            // $('#'+historicLayer.id).css("background","");
                        // }
                    // }                
                // });
            });

            //Close Button
            $(".close").click(function (){ 
                hideAllPanels();
            });

            var resize = function() {
                var header = $('.breadcrumbs').outerHeight() + $('.header').outerHeight();
                $('#report-body').height($(window).height() - header);
            };            

            $('body').removeClass('scroll-y');
            resize();
            $(window).resize(resize); 

            _.each($('.report-item-list'), function(list) {
                if ($(list).find('.report-list-item').length === 0) {
                    $(list).find('.empty-message').show();
                }
            })
            
            

        },

        zoomToResource: function(resourceid){
            this.cancelFitBaseLayer = true;
            var feature = this.selectedFeatureLayer.getSource().getFeatureById(resourceid);
            if(feature.getGeometry().getGeometries().length > 1){
                var extent = feature.getGeometry().getExtent();
                var minX = extent[0];
                var minY = extent[1];
                var maxX = extent[2];
                var maxY = extent[3];
                var polygon = new ol.geom.Polygon([[[minX, minY], [maxX, minY], [maxX, maxY], [minX, maxY], [minX, minY]]]);
                this.map.map.getView().fitGeometry(polygon, this.map.map.getSize(), {maxZoom:18}); 
            }else{
                this.map.map.getView().fitGeometry(feature.getGeometry().getGeometries()[0], this.map.map.getSize(), {maxZoom:18});                    
            }
        },
        
        selectHistoricMap: function(historicmap){
            var self = this;
            _.each(self.map.historicLayers, function(historicLayer){
                if (historicLayer.id == historicmap){
                    historicLayer.layer.setVisible(!historicLayer.layer.getVisible());
                    
                    // if activated, set layer on top of all historic maps/basemaps
                    // also highlight layer button by changing background
                    if (historicLayer.layer.getVisible() == true) {
                        setlyrs = self.map.historicLayers.length + self.map.baseLayers.length;
                        
                        self.map.map.removeLayer(historicLayer.layer);
                        self.map.map.getLayers().insertAt(setlyrs, historicLayer.layer);
                        
                        $('#'+historicLayer.id).css("background","#eaeaea");
                    } else {
                        $('#'+historicLayer.id).css("background","");
                    }
                }                
            });
            console.log("show features");
            this.highlightFeatures();
        },

        highlightFeatures: function(){
            
            //pulled from beginning of initialize
            var resource_geometry = $('#resource_geometry');
            var geometry = JSON.parse(resource_geometry.val());

            var source, geometries;
            var self = this;
            var f = new ol.format.GeoJSON({defaultDataProjection: 'EPSG:4326'});

            //if(!this.selectedFeatureLayer){
            var zIndex = 0;
            var styleCache = {};

            var style = function(feature, resolution) {
                return [new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(66, 139, 202, 0.4)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(66, 139, 202, 0.9)',
                        width: 2
                    }),
                    image: new ol.style.Circle({
                        radius: 10,
                        fill: new ol.style.Fill({
                            color: 'rgba(66, 139, 202, 0.4)'
                        }),
                        stroke: new ol.style.Stroke({
                            color: 'rgba(66, 139, 202, 0.9)',
                            width: 2
                        })
                    })
                })];
            };                     
            this.selectedFeatureLayer = new ol.layer.Vector({
                source: new ol.source.GeoJSON(),
                style: style,
                name: "feature"
            });
            
            var layers = this.map.map.getLayers().getArray(); 
            var feature = layers.filter(function(layer) { 
                return layer.get('name') == 'feature';                
            });
            this.map.map.removeLayer(layer);

            this.map.map.addLayer(this.selectedFeatureLayer);
            position = self.map.historicLayers.length + self.map.baseLayers.length + 1;
            console.log(position);
            console.log(self.map.map.getLayers());
                //self.map.map.getLayers().insertAt(position, self.selectedFeatureLayer);                
            //}
            this.selectedFeatureLayer.getSource().clear();

            feature = {
                'type': 'Feature',
                'id': '1',
                'geometry':  geometry
            };

            this.selectedFeatureLayer.getSource().addFeature(f.readFeature(feature, {featureProjection: 'EPSG:3857'}));
        }
    });

    new ReportView();
});
