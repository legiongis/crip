define([
    'openlayers',
    'map/resource-layers',
    'map/layer-model',
    'layers-i18n'
], function(ol, resourceLayers, LayerModel, layerI18n) {
    var layers = resourceLayers.layers;

    var priv_prop = new LayerModel({
        name: 'Private Land in Kisatchie NF',
        categories: ["Reference"],
        icon: 'fa fa-bookmark-o',
        infoContent: "This layer is provided to encourage responsible exploration in Kisatchie National Forest.  The dataset was downloaded from the <a href='http://www.fs.usda.gov/main/kisatchie/landmanagement/gis'>USFS</a> on 5-4-15.  All boundaries marked on the ground take precedence over those displayed on this map.",
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
    });
    
    var plss_ref = new LayerModel({
        name: 'PLSS Reference',
        categories: ["Reference"],
        icon: 'fa fa-bookmark-o',
        infoContent: "Use this for quick reference when trying to determine the Township/Range designation of a resource or location",
        layer: new ol.layer.Tile({
            is_arches_layer: "nobutclose",
            source: new ol.source.TileWMS({
                url: 'http://54.148.201.140:8080/geoserver/vect/wms/',
                params: {
                    'LAYERS': 'vect:PLSS_towns',
                    'TILED': true,
                },
                serverType: 'geoserver'
            })
        })
    });
    
    
    layers.push(
        priv_prop,
        plss_ref
    );

    return layers;
});
