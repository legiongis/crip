define([
    'jquery',
    'openlayers',
    'underscore',
    'arches'
], function($, ol, _, arches) {

    //The following is presented (without real WMS addresses) as an example of a map layer that will show up in
    //the historic maps panel in any of the map views.  Two ol layers are created, "reliefLyr" and "hillshadeLyr",
    //and then added as the "layer" property and "altlayer" property of the layer object "relief" that is
    //ultimately used in the map interface.  Use the same format for any historic map layers to be defined in the
    //historic-layers.js file.

    // full confederate map
    var confed_fullLyr = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://XX.XX.XX.XX:8080/geoserver/raster/wms/',
            params: {
                'LAYERS': 'raster:confed_color',
                'TILED': true,
                },
            serverType: 'geoserver'   
        }),
        visible: false,
    });

    // transparent confederate map (for altlayer)
    var confed_transLyr = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://XX.XX.XX.XX:8080/geoserver/raster/wms/',
            params: {
                'LAYERS': 'raster:confed_trans',
                'TILED': true,
                },
            serverType: 'geoserver'   
        }),
        visible: false,
    });

    var confed = {
        id: 'confed',
        name: 'Confederate Maps',
        icon: arches.urls.media + 'img/map/thb_confed_clr.png',
        layer: confed_fullLyr,
        altlayer: confed_transLyr,
        showInfo: 'EDIT THE WMS ADDRESS AND INFO FOR THIS LAYER IN crip/crip/media/js/map/historic-layers.js',
    }
    confed.layer.matchid = confed.id;
    confed.altlayer.matchid = confed.id;

    // aggregate layers in historicLayers array
    var historicLayers = [
        confed,
    ]  
   
    return historicLayers;
});