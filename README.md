#Cane River Inventory Package (CRIP)

The CRIP is an adaptation of the Heritage Inventory Package (HIP), developed for the Historic Places LA installation of Arches v3.  Some of the changes made are as follows:

-General rebranding for the Cane River National Heritage Area
-A template for adding historic map overlays has been added (see media/js/map/historic-layers.js)
-The ability to add an "alternate" color scheme to any layer instance.  This was added to support the ability to toggle transparent backgrounds on some historic maps, and allow alternate colors for Sanborn map overlays and the relief basemap.
-A utility for converting shapefiles to .arches pipe-delimited .csv files in preparation for loading files.  This utility is called "shp2arches".  It has extend support for authority document validation, so the user's shapefile may list a value's "conceptid" or "Preflabel".  It's a python script in the main app folder, and can be run from the command line like so:
    $: python shp2arches path/to/shapefile
-Basic modifications to authority documents to reflect the types of heritage resources found in the CRNHA

To install this app with Arches v3:
-Follow the normal Arches HIP installation instructions
-At the point where you must create a new app, just clone this repository instead
-Install the package and you'll be ready to go

Questions, feedback, or help: mr.adamcox@gmail.com