Standard script installation without melDrop:

If maya is open:
# drop the mel-file into maya to make it available immediately
# take the name from the mel-file WITHOUT .mel for the command name
# use this command name to execute the script in your command line, on a shelf
  button or a hotkey

For installation:
# go to your private maya-script folder:
  C:\Documents and Settings\USERNAME\My Documents\maya\VERSION\scripts
# drop only the .mel-file in there

# if you want the icon go to your private icons folder:
  C:\Documents and Settings\USERNAME\My Documents\maya\VERSION\prefs\icons
# drop the image file in there
# create shelfButton by marking & dropping the command name into the shelf
  (in maya: with middle mouse button, from ouside: with the left mouse button)
# click the v-button on the shelf, run "ShelfEditor..."
# select the just created shelfButton and press "Change Image..."
# browser to the image you dropped in your private icons folder.

--------------------------------------------------------------------------------
with melDrop its just: drag & drop all files into Maya viewport - voila!
please report ideas & bugs to ewerybody+melDrop@gmail.com - thanks! eRiC