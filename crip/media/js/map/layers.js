define([
    'openlayers',
    'map/resource-layers',
    'map/layer-model',
    'layers-i18n'
], function(ol, resourceLayers, LayerModel, layerI18n) {
    var layers = resourceLayers.layers;

    layers.push(new LayerModel({
        name: 'Private Land in Kisatchie NF',
        categories: ["Boundaries"],
        icon: 'fa fa-bookmark-o',
        infoContent: "This layer is provided to encourage exploration in Kisatchie while appropriately avoiding private land.  The dataset was downloaded from the <a href='http://www.fs.usda.gov/main/kisatchie/landmanagement/gis'>USFS</a> on 5-4-15.  All boundaries marked on the ground take precedence over those displayed here.",
        layer: new ol.layer.Tile({
            is_arches_layer: "nobutclose",
            source: new ol.source.TileWMS({
                url: 'http://54.148.201.140:8080/geoserver/vect/wms/',
                params: {
                    'LAYERS': 'vect:kisatchie_private_land',
                    'TILED': true,
                },
                serverType: 'geoserver'
            })
        })
    }));

    return layers;
});
