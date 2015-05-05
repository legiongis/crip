define([
    'openlayers',
    'map/resource-layers',
    'map/layer-model',
    'layers-i18n'
], function(ol, resourceLayers, LayerModel, layerI18n) {
    var layers = resourceLayers.layers;

    layers.push(new LayerModel({
        name: 'fedland',
        categories: ["Boundaries"],
        icon: 'fa fa-bookmark-o',
        infoContent: "this is the infoContent",
        layer: new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://54.148.201.140:8080/geoserver/vect/wms/',
                params: {
                    'LAYERS': 'vect:fedland020',
                    'TILED': true,
                },
                serverType: 'geoserver'
            })
        })
    }));

    return layers;
});
