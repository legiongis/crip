##Cane River Inventory Package (CRIP)

The CRIP is an adaptation of the Heritage Inventory Package (HIP), which was originally developed for the [Historic Places LA](http://www.historicplacesla.org) installation of [Arches, v3.0](http://www.archesproject.org).  The creation of the CRIP is the result of a project for the [Cane River National Heritage Area](http://www.canerivernha.org) that resulted in the [Cane River Historic Inventory and Map](http://crhim.canerivernha.org).  Some of the changes made are as follows:

- General rebranding to suit the Cane River National Heritage Area.

- A template for adding historic map overlays has been added (see media/js/map/historic-layers.js) as well as a few extra basemaps.

- The ability to add an "alternate" color scheme to any layer instance.  This was added to support the ability to toggle transparent backgrounds on some historic maps, and allow alternate colors for Sanborn map overlays and the relief basemap.  It is achieved by allowing any map.layer to be paired with a second ol.layer instance.

- A utility for converting shapefiles to .arches pipe-delimited .csv files in preparation for loading existing spatial data.  This utility is called "shp2arches".  It has extended support for authority document validation, so the user's shapefile may list a value's "conceptid" or "Preflabel".  It's a python script in the main app folder, and can be run from the command line like so:

        $: python shp2arches.py path/to/shapefile.shp

- Basic modifications to authority documents to reflect the types of heritage resources found in the CRNHA

To install this app with Arches v3:

1. Follow the normal Arches HIP installation instructions (link coming soon!)

2. At the point where you can create a new app, just clone this repository instead

3. Install the package and you'll be ready to go

Questions, feedback, or help: mr.adamcox@gmail.com