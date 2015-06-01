##Cane River Inventory Package

The Cane River Inventory Package (CRIP) is an adaptation of the Heritage Inventory Package (HIP), which was originally developed for [Historic Places LA](http://www.historicplacesla.org).  It is an app that functions on top of [Arches, v3.0](http://www.archesproject.org).  The CRIP is the outcome of a project for the [Cane River National Heritage Area](http://www.canerivernha.org) to create an inventory of historic resources (and more!) in and around historic Natchitoches, LA.  The resulting implementation of the CRIP can be seen at work in the [Cane River Heritage Inventory & Map](http://crhim.canerivernha.org).

Some of the changes made in the CRIP are as follows:

- General rebranding to suit the Cane River National Heritage Area

- Unique help documentation built into each separate webpage

- A new template for adding historic map overlays (see media/js/map/historic-layers.js) as well as a few extra basemaps

- The ability to add an "alternate" color scheme to any layer instance.  This was added to support the ability to toggle transparent backgrounds on some historic maps, and allow alternate colors for Sanborn map overlays and the relief basemap.  It is achieved by allowing any map.layer object to contain a second ol.layer instance, which can be swapped in for the original ol.layer instance.

- Modifications to some resource graphs and CRUD forms, and rewrite of most authority documents to reflect the types of heritage resources found in the CRNHA

####Installation:

You can install this app just like any other arches app; it is just a modified version of the HIP app used for historicplacesla.org.  Begin by following the normal Arches HIP installation [instructions](http://arches-hip.readthedocs.org/en/latest/getting-started/#installating-arches-hip).  At step #5, where you must create a new app, just clone this repository instead, using the following command (you may need to install git first):

        git clone https://github.com/mradamcox/crip.git
        
Now just continue with the installation instructions, substituting `crip` for `my_hip_app` wherever the latter occurs, because "crip" is now the name of your app.

Questions, feedback, or (limited!) help: mr.adamcox@gmail.com