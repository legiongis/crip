define([
    'jquery',
    'openlayers',
    'underscore',
    'arches'
], function($, ol, _, arches) {

    // make variables for all recurring urls
    var gswms_crnha = 'http://crhim.canerivernha.org/geoserver/wms/';
    var tiles_crnha = 'http://crhim.canerivernha.org/tiles/';
    var gswms_legion = 'https://db.legiongis.com/geoserver/wms/';
    var tiles_ac = 'https://s3-us-west-2.amazonaws.com/natchdata/tiles/';
    
    // sanborn map 1892
    var sanborn1892black_Lyr = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: gswms_legion,
            params: {
                'LAYERS': 'crnha:natchitoches_sanborn1892',
                'TILED': true,
                'STYLES': 'ras_Black0Trans170',
            },
            serverType: 'geoserver',
            attributions: [
                new ol.Attribution({
                    html: 'Sanborn Maps\u00A9 used here with special permission from <a href="http://edrnet.com/">EDR</a>.'
                })
            ],
        }),
        visible: false,
    });

    // sanborn 1892 in red (for overlays?)
    var sanborn1892red_Lyr = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: gswms_legion,
            params: {
                'LAYERS': 'crnha:natchitoches_sanborn1892',
                'TILED': true,
                'STYLES': 'ras_Red0Trans170',
            },
            serverType: 'geoserver',
            attributions: [
                new ol.Attribution({
                    html: 'Sanborn Maps\u00A9 used here with special permission from <a href="http://edrnet.com/">EDR</a>.'
                })
            ],            
        }),
        visible: false,
    });

    var sanborn1892 = {
        id: 'sanborn1892',
        name: 'Sanborn Maps\u00A9 (1892)',
        icon: arches.urls.media + 'img/map/thb_san1892.png',
        layer: sanborn1892black_Lyr,
        altlayer: sanborn1892red_Lyr,
        showInfo: 'Sanborn Maps\u00A9 were created to assist fire insurance companies with risk assessment for certain properties.  In this application, the original map sheets for the city of Natchitoches have been stitched together to show a single seamless layer.  Special permission was granted by <a href="http://edrnet.com/">EDR</a> for use of their scans of these maps.',
    }
    sanborn1892.layer.matchid = sanborn1892.id;
    sanborn1892.altlayer.matchid = sanborn1892.id;

    // sanborn map 1914
    var sanborn1914black_Lyr = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: gswms_legion,
            params: {
                'LAYERS': 'crnha:natchitoches_sanborn1914',
                'TILED': true,
                'STYLES': 'ras_Black0Trans170',
            },
            serverType: 'geoserver',
            attributions: [
                new ol.Attribution({
                    html: 'Sanborn Maps\u00A9 used here with special permission from <a href="http://edrnet.com/">EDR</a>.'
                })
            ],
        }),
        visible: false,
    });
    
    // sanborn 1914 in red (for overlays?)
    var sanborn1914red_Lyr = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: gswms_legion,
            params: {
                'LAYERS': 'crnha:natchitoches_sanborn1914',
                'TILED': true,
                'STYLES': 'ras_Red0Trans170',
            },
            serverType: 'geoserver',
            attributions: [
                new ol.Attribution({
                    html: 'Sanborn Maps\u00A9 used here with special permission from <a href="http://edrnet.com/">EDR</a>.'
                })
            ],
        }),
        visible: false,
    });
    
    var sanborn1914 = {
        id: 'sanborn1914',
        name: 'Sanborn Maps\u00A9 (1914)',
        icon: arches.urls.media + 'img/map/thb_san1914.png',
        layer: sanborn1914black_Lyr,
        altlayer: sanborn1914red_Lyr,
        showInfo: 'Sanborn Maps\u00A9 were created to assist fire insurance companies with risk assessment for certain properties.  In this application, the original map sheets for the city of Natchitoches have been stitched together to show a single seamless layer.  Special permission was granted by <a href="http://edrnet.com/">EDR</a> for use of their scans of these maps.',
    }
    sanborn1914.layer.matchid = sanborn1914.id;
    sanborn1914.altlayer.matchid = sanborn1914.id;

    // full confederate map
    var confed_fullLyr = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: gswms_legion,
            params: {
                'LAYERS': 'crnha:confedmaps_full',
                'TILED': true,
            },
            serverType: 'geoserver'   
        }),
        visible: false,
    });

    // transparent confederate map (for altlayer)
    var confed_transLyr = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: gswms_legion,
            params: {
                'LAYERS': 'crnha:confedmaps_trans',
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
        showInfo: 'This layer comprises five separate maps from the <a href="https://research.archives.gov/id/5900024" target="_blank">Civil Works Map File, Record Group 77, Z-33</a>, in the National Archives. Maps in this record group are described on the index sheet as "Parish maps of Louisiana that were captured from the Confederates."',
    }
    confed.layer.matchid = confed.id;
    confed.altlayer.matchid = confed.id;

    // tiled plat map layer
    var platmaps_transLyr = new ol.layer.Tile({
        name: "platmaps_transLyr",
        source: new ol.source.XYZ({
            url: tiles_ac + 'historictownplats/{z}/{x}/{y}.png'
        }),
        visible: false,
    });   

    // DO NOT ACTIVATE FULL LAYER (altlayer) AT THIS TIME
    var platmaps_fullLyr = new ol.layer.Tile({
        name: "platmaps_fullLyr",
        source: new ol.source.XYZ({
            url: tiles_crnha + 'platmaps_white/{z}/{x}/{y}.png'
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
            url: tiles_ac + 'civilwarroadmap/{z}/{x}/{y}.png'
        }),
        visible: false,
    });
    var roadmap = {
        id: 'roadmap',
        name: 'Confederate Road Survey',
        icon: arches.urls.media + 'img/map/thb_roadmap.png',
        layer: roadmapLyr,
        altlayer: false,
        showInfo: 'This map, full title: <em>Natchitoches and Alexandria Survey West of Red River, Mershon</em> is from the <a href="https://research.archives.gov/id/5900024" target="_blank">Civil Works Map File, Record Group 77, Z-33</a>, in the National Archives. Maps in this record group are described on the index sheet as "Parish maps of Louisiana that were captured from the Confederates." The map shows the road between Natchitoches and Alexandria (only the portion within Natchitoches Parish is displayed here), and it was originally drawn in many segments on both sides of a single piece of paper.',
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