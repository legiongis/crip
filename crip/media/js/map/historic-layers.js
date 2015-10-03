define([
    'jquery',
    'openlayers',
    'underscore',
    'arches'
], function($, ol, _, arches) {

    // sanborn map 1892
    var sanborn1892black_Lyr = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://54.148.201.140:8080/geoserver/raster/wms/',
            params: {
                'LAYERS': 'raster:sanborn1892_blk',
                'TILED': true,
                },
            serverType: 'geoserver',
            attributions: [
                new ol.Attribution({
                    html: 'Sanborn\u00A9 Maps used here with special permission from <a href="http://edrnet.com/">EDR</a>.'
                })
            ],
        }),
        visible: false,
    });

    // sanborn 1892 in red (for overlays?)
    var sanborn1892red_Lyr = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://54.148.201.140:8080/geoserver/raster/wms/',
            params: {
                'LAYERS': 'raster:sanborn1892_red',
                'TILED': true,
                },
            serverType: 'geoserver',
            attributions: [
                new ol.Attribution({
                    html: 'Sanborn\u00A9 Maps used here with special permission from <a href="http://edrnet.com/">EDR</a>.'
                })
            ],            
        }),
        visible: false,
    });

    var sanborn1892 = {
        id: 'sanborn1892',
        name: 'Sanborn\u00A9 Maps (1892)',
        icon: arches.urls.media + 'img/map/thb_san1892.png',
        layer: sanborn1892black_Lyr,
        altlayer: sanborn1892red_Lyr,
        showInfo: 'Sanborn\u00A9 maps were created to assist fire insurance companies with risk assessment for certain properties.  In this application, the original map sheets for the city of Natchitoches have been stitched together to show a single seamless layer.  Special permission was granted by <a href="http://edrnet.com/">EDR</a> for use of their scans of these maps.',
    }
    sanborn1892.layer.matchid = sanborn1892.id;
    sanborn1892.altlayer.matchid = sanborn1892.id;

    // sanborn map 1914
    var sanborn1914black_Lyr = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://54.148.201.140:8080/geoserver/raster/wms/',
            params: {
                'LAYERS': 'raster:sanborn1914_blk',
                'TILED': true,
                },
            serverType: 'geoserver',
            attributions: [
                new ol.Attribution({
                    html: 'Sanborn\u00A9 Maps used here with special permission from <a href="http://edrnet.com/">EDR</a>.'
                })
            ],
        }),
        visible: false,
    });
    
    // sanborn 1914 in red (for overlays?)
    var sanborn1914red_Lyr = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://54.148.201.140:8080/geoserver/raster/wms/',
            params: {
                'LAYERS': 'raster:sanborn1914_red',
                'TILED': true,
                },
            serverType: 'geoserver',
            attributions: [
                new ol.Attribution({
                    html: 'Sanborn\u00A9 Maps used here with special permission from <a href="http://edrnet.com/">EDR</a>.'
                })
            ],
        }),
        visible: false,
    });
    
    var sanborn1914 = {
        id: 'sanborn1914',
        name: 'Sanborn\u00A9 Maps (1914)',
        icon: arches.urls.media + 'img/map/thb_san1914.png',
        layer: sanborn1914black_Lyr,
        altlayer: sanborn1914red_Lyr,
        showInfo: 'Sanborn\u00A9 maps were created to assist fire insurance companies with risk assessment for certain properties.  In this application, the original map sheets for the city of Natchitoches have been stitched together to show a single seamless layer.  Special permission was granted by <a href="http://edrnet.com/">EDR</a> for use of their scans of these maps.',
    }
    sanborn1914.layer.matchid = sanborn1914.id;
    sanborn1914.altlayer.matchid = sanborn1914.id;

    // full confederate map
    var confed_fullLyr = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://crhim.canerivernha.org:8080/geoserver/confed_maps/wms/',
            params: {
                'LAYERS': 'confed_maps:confed_full',
                'TILED': true,
                },
            serverType: 'geoserver'   
        }),
        visible: false,
    });

    // transparent confederate map (for altlayer)
    var confed_transLyr = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://crhim.canerivernha.org:8080/geoserver/confed_maps/wms/',
            params: {
                'LAYERS': 'confed_maps:confed_trans',
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
        showInfo: 'This layer comprises five separate maps from the <a href="http://research.archives.gov/description/305566" target="_blank">Civil Works Map File</a> in the National Archives, which contains many Civil War era maps.  These maps were purportedly captured from the confederate army, but little research has been done on them.',
    }
    confed.layer.matchid = confed.id;
    confed.altlayer.matchid = confed.id;

    // tiled plat map layer
    var platmaps_transLyr = new ol.layer.Tile({
        name: "platmaps_transLyr",
        source: new ol.source.XYZ({
            url: 'http://199.184.68.66/tiles/platmaps_trans/{z}/{x}/{y}.png'
        }),
        visible: false,
    });   

    // DO NOT ACTIVATE FULL LAYER (altlayer) AT THIS TIME
    var platmaps_fullLyr = new ol.layer.Tile({
        name: "platmaps_fullLyr",
        source: new ol.source.XYZ({
            url: 'http://199.184.68.66/tiles/platmaps_white/{z}/{x}/{y}.png'
        }),
        visible: false,
    });

    var platmaps = {
        id: 'platmaps',
        name: 'Plat Maps',
        icon: arches.urls.media + 'img/map/thb_plats.png',
        layer: platmaps_transLyr,
        altlayer: false,
        showInfo: 'This layer comprises many historic township plat maps, all acquired through the Louisiana State Land Office <a href="https://wwwslodms.doa.la.gov/" target="_blank">Historical Documents</a> database.  These plat maps are not all from the same year, so the date of each has been added in the northeast corner of the township.',
    }
    platmaps.layer.matchid = platmaps.id;

    // tiled road map layer
    var roadmapLyr = new ol.layer.Tile({
        name: "roadmapLyr",
        source: new ol.source.XYZ({
            url: 'http://199.184.68.66/tiles/civilwarroadmap/{z}/{x}/{y}.png'
            //url: 'https://s3-us-west-2.amazonaws.com/natchdata/tiles/historictownplats/{z}/{x}/{y}.png'
        }),
        visible: false,
    });
    var roadmap = {
        id: 'roadmap',
        name: 'Confederate Road Map',
        icon: arches.urls.media + 'img/map/thb_roadmap.png',
        layer: roadmapLyr,
        altlayer: false,
        showInfo: 'This is a captured confederate map showing the road between Natchitoches and Alexandria (only the portions within Natchitoches Parish are shown here).  It was originally drawn in many segments on both sides of a single piece of paper.',
    }
    roadmap.layer.matchid = roadmap.id;

    // aggregate layers in historicLayers array
    var historicLayers = [
        platmaps,
        confed,
        roadmap,
        sanborn1914,
        sanborn1892,        
    ]  
   
    return historicLayers;
});