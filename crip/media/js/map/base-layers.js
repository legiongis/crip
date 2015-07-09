define([
    'jquery',
    'openlayers',
    'underscore',
    'arches'
], function($, ol, _, arches) {
    var bingLayers = arches.bingLayers;

    //get bing baselayers as an array
    _.each(bingLayers, function(layer) {
        layer.layer = new ol.layer.Tile({
            visible: false,
            preload: Infinity,
            source: new ol.source.BingMaps({
                key: arches.bingKey,
                imagerySet: layer.id
            })
        });
    });

    //pull desirable bing layers and set new thumbnails
    var bingstr = bingLayers[0];
    bingstr.icon = arches.urls.media + 'img/map/thb_bingstr.png';
    bingstr.alttext = 'Bing Streets';
    bingstr.layer.matchid = bingstr.id;
    bingstr.altlayer = false;
    bingstr.showInfo = false;
    bingstr.maxzoom = 19;

    var bingsat = bingLayers[1];
    bingsat.icon = arches.urls.media + 'img/map/thb_bingsat.png';
    bingsat.alttext = 'Bing Satellite Imagery';
    bingsat.layer.matchid = bingsat.id;
    bingsat.altlayer = false;
    bingsat.showInfo = false;
    bingsat.maxzoom = 19;

    var binghyb = bingLayers[2];
    binghyb.icon = arches.urls.media + 'img/map/thb_binghyb.png';
    binghyb.alttext = 'Bing Satellite and Streets';
    binghyb.layer.matchid = binghyb.id;
    binghyb.altlayer = false;
    binghyb.showInfo = false;
    binghyb.maxzoom = 19;

    //Open Street Map from MapQuest
    //AT THIS POINT, UNSURE IF OSM WILL BE USED.
    var osmLyr = new ol.layer.Tile({
        source: new ol.source.MapQuest({
            layer: 'osm',
        }),
        visible: false,
    });   
    var osm = {
        id: 'osm',
        name: 'Open Street Map',
        icon: arches.urls.media + 'img/map/google_streets.jpg',
        layer: osmLyr,
        altlayer: false,
        alttext: 'Open Street Map',
        showInfo: false,
    };
    osm.layer.matchid = osm.id;
    osm.maxzoom = 19;
    
    //Open Street Map Hybrid from MapQuest
    // var osmlabelLyr = new ol.layer.Tile({
        // source: new ol.source.MapQuest({
            // layer: 'hyb',
        // }),
        // visible: false,
    // });
    // var hybridLyr = new ol.Collection([
        // baseLayers[1].layer,
        // osmlabelLyr
    // ]);
    
    // var hybrid = {
        // id: 'osm',
        // name: 'Open Street Map Hybrid',
        // icon: arches.urls.media + 'img/map/google_streets.jpg',
        // layer: hybridLyr
    // };
    
    //USGS Topo from CRNHA server
    var usgsLyr = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://199.184.68.66/tiles/drg/{z}/{x}/{y}.png',
            //url: 'https://s3-us-west-2.amazonaws.com/natchdata/tiles/drg/{z}/{x}/{y}.png',
            attributions: [
                new ol.Attribution({
                    html: '<a href="http://www.usgs.gov/"><img src="'+arches.urls.media + 'img/icons/USGS_trans.png"/></a> All U.S. Geological Survey maps are in the public domain.'
                })
            ],
        }),
        visible: false,
    });    
    var usgs = {
        id: 'usgs',
        name: 'USGS 24k Topo',
        icon: arches.urls.media + 'img/map/thb_usgs.png',
        layer: usgsLyr,
        altlayer: false,
        alttext: 'USGS Digital Raster Graphics, 1:24,000',
        showInfo: 'This is a seamless mosaic of 24k USGS Quads from <a href="http://datagateway.nrcs.usda.gov/" target="_blank">NRCS</a>.',
    };
    usgs.layer.matchid = usgs.id;
    usgs.maxzoom = 17;
     
    //Shaded Relief basemap from CRNHA server  
    var reliefLyr = new ol.layer.Tile({
        name: "relief",
        source: new ol.source.XYZ({
            url: 'http://199.184.68.66/tiles/relief_basemap/{z}/{x}/{y}.png',
            //url: 'https://s3-us-west-2.amazonaws.com/natchdata/tiles/relief_basemap/{z}/{x}/{y}.png',
            attributions: [
                new ol.Attribution({
                    html: '<a href="http://atlas.lsu.edu">Atlas: The Louisiana Statewide GIS</a>. LSU Department of Geography and Anthropology, Baton Rouge, LA.'
                })
            ],
        }),
        opacity: .95,
        visible: false,
    });
    // b/w altlayer for hillshade
    var hillshadeLyr = new ol.layer.Tile({
        name: "relief",
        source: new ol.source.XYZ({
            url: 'http://199.184.68.66/tiles/hillshade/{z}/{x}/{y}.png',
            //url: 'https://s3-us-west-2.amazonaws.com/natchdata/tiles/relief_basemap/{z}/{x}/{y}.png',
            attributions: [
                new ol.Attribution({
                    html: '<a href="http://atlas.lsu.edu">Atlas: The Louisiana Statewide GIS</a>. LSU Department of Geography and Anthropology, Baton Rouge, LA.'
                })
            ],
        }),
        visible: false,
    });
    var relief = {
        id: 'relief',
        name: 'Shaded Relief',
        icon: arches.urls.media + 'img/map/thb_relief.png',
        layer: reliefLyr,
        altlayer: hillshadeLyr,
        alttext: 'Shaded Relief from Louisiana Statewide LiDAR Project',
        showInfo: 'This layer is a hillshade derivative of LiDAR data distributed by <a href="http://atlas.lsu.edu">Atlas: The Louisiana Statewide GIS</a>, which was produced for the <a href="http://atlas.lsu.edu/central/la_lidar_project.pdf" target="_blank">Louisiana State LiDAR Project</a>, LSU Department of Geography and Anthropology, Baton Rouge, LA.',
    };

    relief.layer.matchid = relief.id;
    relief.altlayer.matchid = relief.id;
    relief.maxzoom = 18;

    //Make blank base layer in order to show no basemap
    var blankLyr = new ol.layer.Tile({
        name: "blank",
        source: new ol.source.XYZ({
            url: arches.urls.media + 'img/map/white_256x256.png',
        }),
        visible: false
    });  
    var blank = {
        id: 'blank',
        name: 'None',
        icon: arches.urls.media + 'img/map/thb_blank.png',
        layer: blankLyr,
        altlayer: false,
        alttext: 'Click to remove basemap',
        showInfo: 'When viewing historic maps, it may be useful to remove the basemap altogether.',
    };
    blank.layer.matchid = blank.id;
    blank.maxzoom = 20;
    
    //Make blank base layer in order to show no basemap
    var amcemLyr = new ol.layer.Tile({
        name: "amcem",
        source: new ol.source.TileWMS({
            url: 'http://54.148.201.140:8080/geoserver/raster/wms/',
            params: {
                'LAYERS': 'raster:basemap_image',
                'TILED': true,
            },
            serverType: 'geoserver'   
        }),
        visible: false
    });  
    var amcem = {
        id: 'amcem',
        name: 'American Cemetery',
        icon: false,
        layer: amcemLyr,
        altlayer: false,
        alttext: 'Click to remove basemap',
        showInfo: 'When viewing historic maps, it may be useful to remove the basemap altogether.',
    };
    blank.layer.matchid = blank.id;
    blank.maxzoom = 20;

    // aggregate layers in the baseLayers array
    var baseLayers = [
        bingstr,
        bingsat,
        binghyb,
        usgs,
        relief,
        blank,
        amcem,
    ];  

    //set default map style to Open Street Map
    baseLayers[0].layer.setVisible(true);
    
    return baseLayers;
});