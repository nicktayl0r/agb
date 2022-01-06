Playcanvas Shelf Readme:

Needed Files:
-----------------------
shelf_Playcanvas.mel
finish_flags.png
maya2playcanvas_icon4.png
playcanvas_inverse_logo.png
renameDuplicates_icon2.png
resetPivot.xpm

Installation:
-----------------------
-Put "shelf_Playcanvas.mel" into the "shelves" folder:

Windows:
C:\Users\[userName]\Documents\maya\[Maya Version]\prefs\shelves
Mac:
Macintosh HD/Users/[userName]/Library/Preferences/Autodesk/maya/[Maya Version]/prefs/shelves

-Put the other files into the "icons" folder:

Windows:
C:\Users\[userName]\Documents\maya\[Maya Version]\prefs\icons
Mac:
Macintosh HD/Users/[userName]/Library/Preferences/Autodesk/maya/[Maya Version]/prefs/icons

------------------------
NOTE: Some versions of Maya have a bug where shelves sometimes load empty. In other words, the shelf buttons disappear. If this is happening to you, it can fixed by deleting the "userPrefs.mel" file located in:
Windows:
C:\Users\[userName]\Documents\maya\[Maya Version]\prefs
Mac:
Macintosh HD/Users/[userName]/Library/Preferences/Autodesk/maya/[Maya Version]/prefs/
-------------------------

Description of Scripts on the Shelf:

1. Set Maya Animation preferences for Playcanvas:
This script sets the fps to 60 (and adjusts the time slider to account for that change). It also sets the default keyframe interpolation to linear.

2. Maya To Playcanvas Animation script:
This script uses a locator to resample animation ON SELECTED OBJECTS and spits out a custom JSON animation file to be used in Playcanvas instead of the one Playcanvas creates on FBX import. The custom JSON file looks at every keyframe and will be more precise but could also be less efficient since most likely (not in all cases) will have much more aniamtion information than what Playcanvas creates.
This script also outputs an FBX file with the selected objects.

3. Rename duplicates:
Playcanvas NEEDS unique names on animated objects. Running this script will rename duplictes (and the originals actually) so that the objects all have unique names.

4. Reset Pivot:
This script will reset any moved pivot and keep the animtion. If you are seeing issues with an object not animating correctly and you think it may have to do with the pivot, this script and it will hopefully fix that issue.

5. Defaults:
This script sets the animation preferences back to the default values of 24 fps and "auto" keyframe interpolation. This essentially undoes the first script. The icon is checkered flags as this will be good to run after you have finished animating for Playcanvas and wish to return to Maya's default animation preferences (24 fps and "auto" interpolation).
