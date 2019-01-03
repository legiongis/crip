define([
    'openlayers',
    'map/resource-layers',
    'map/layer-model',
    'layers-i18n'
], function(ol, resourceLayers, LayerModel, layerI18n) {
    var layers = resourceLayers.layers;
    
    // make variables for all recurring urls
    var gswms_legion = 'https://db.legiongis.com/geoserver/wms/';

    var priv_prop = new LayerModel({
        name: 'Public/Private Land, Kisatchie NF',
        categories: ["Reference"],
        icon: 'fa fa-bookmark-o',
        infoContent: "Public land shown in green, private land in red. This layer is provided to encourage responsible exploration in Kisatchie National Forest. The dataset was downloaded from the <a href='http://www.fs.usda.gov/main/kisatchie/landmanagement/gis'>USFS</a> on 8/4/17. Any property boundaries observed on the ground take precedence over those displayed on this map. Use the transparency dial at left to improve the view of this layer.",
        layer: new ol.layer.Tile({
            is_arches_layer: "nobutclose",
            source: new ol.source.TileWMS({
                url: gswms_legion,
                params: {
                    'LAYERS': 'crnha:fedland_ownership',
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
                url: gswms_legion,
                params: {
                    'LAYERS': 'crnha:PLSS_towns',
                    'TILED': true,
                },
                serverType: 'geoserver'
            })
        })
    });
    
    var amcem_shrubs = new LayerModel({
        name: 'American Cemetery Shrubs',
        categories: ["Vegetation"],
        icon: 'fa fa-circle',
        iconColor: '#A8302E',
        infoContent: "Vegetation data for the American Cemetery.  Mapped in the fall of 2014 by Laura Bradford.",
        layer: new ol.layer.Tile({
            is_arches_layer: "nobutclose",
            source: new ol.source.TileWMS({
                url: gswms_legion,
                params: {
                    'LAYERS': 'crnha:amcem_shrubs',
                },
                serverType: 'geoserver'
            })
        })
    });
    var amcem_grass = new LayerModel({
        name: 'American Cemetery Ornamental Grass',
        categories: ["Vegetation"],
        icon: 'fa fa-circle',
        iconColor: '#5EB5B4',
        infoContent: "Vegetation data for the American Cemetery.  Mapped in the fall of 2014 by Laura Bradford.",
        layer: new ol.layer.Tile({
            is_arches_layer: "nobutclose",
            source: new ol.source.TileWMS({
                url: gswms_legion,
                params: {
                    'LAYERS': 'crnha:amcem_grass',
                },
                serverType: 'geoserver'
            })
        })
    });
    
    var amcem_stumps = new LayerModel({
        name: 'American Cemetery Stumps',
        categories: ["Vegetation"],
        icon: 'fa fa-circle',
        iconColor: '#533D31',
        infoContent: "Vegetation data for the American Cemetery.  Mapped in the fall of 2014 by Laura Bradford.",
        layer: new ol.layer.Tile({
            is_arches_layer: "nobutclose",
            source: new ol.source.TileWMS({
                url: gswms_legion,
                params: {
                    'LAYERS': 'crnha:amcem_stumps',
                },
                serverType: 'geoserver'
            })
        })
    });
    
    var amcem_trees = new LayerModel({
        name: 'American Cemetery Trees',
        categories: ["Vegetation"],
        icon: 'fa fa-circle',
        iconColor: '#5CBF4E',
        infoContent: "Vegetation data for the American Cemetery.  Mapped in the fall of 2014 by Laura Bradford.",
        layer: new ol.layer.Tile({
            is_arches_layer: "nobutclose",
            source: new ol.source.TileWMS({
                url: gswms_legion,
                params: {
                    'LAYERS': 'crnha:amcem_trees',
                },
                serverType: 'geoserver'
            })
        })
    });
    
    var amcem_vines = new LayerModel({
        name: 'American Cemetery Vines',
        categories: ["Vegetation"],
        icon: 'fa fa-circle',
        iconColor: '#B5AB50',
        infoContent: "Vegetation data for the American Cemetery.  Mapped in the fall of 2014 by Laura Bradford.",
        layer: new ol.layer.Tile({
            is_arches_layer: "nobutclose",
            source: new ol.source.TileWMS({
                url: gswms_legion,
                params: {
                    'LAYERS': 'crnha:amcem_vines',
                },
                serverType: 'geoserver'
            })
        })
    });
    
    var amcem_bulbs = new LayerModel({
        name: 'American Cemetery Bulbs',
        categories: ["Vegetation"],
        icon: 'fa fa-circle',
        iconColor: '#9C7ABF',
        infoContent: "Vegetation data for the American Cemetery.  Mapped in the fall of 2014 by Laura Bradford.",
        layer: new ol.layer.Tile({
            is_arches_layer: "nobutclose",
            source: new ol.source.TileWMS({
                url: gswms_legion,
                params: {
                    'LAYERS': 'crnha:amcem_bulbs',
                },
                serverType: 'geoserver'
            })
        })
    });
    
    
    layers.push(
        priv_prop,
        plss_ref,
        amcem_bulbs,
        amcem_grass,
        amcem_shrubs,
        amcem_stumps,
        amcem_trees,
        amcem_vines
    );

    return layers;
});
