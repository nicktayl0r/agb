#!/usr/bin/python

import os
import gzip
import shutil

import sys
sys.path.append( os.path.join(os.path.dirname(os.path.realpath(__file__)), 'helpers'))
from postBuildConfigJSON_Reader import getCompression_Type, getCompression_AllowedExtTuple, getCompression_ExcludeFileTuple

compression_type = getCompression_Type('../local_api/config/postBuildConfig.json')
allowed_ext = getCompression_AllowedExtTuple('../local_api/config/postBuildConfig.json')
exclude_file = getCompression_ExcludeFileTuple('../local_api/config/postBuildConfig.json')


os.chdir("../publish")

dir_path = os.getcwd()
print (dir_path)

file=''
for root, dirs, files in os.walk("."):
  for name in files:
    if(name.endswith(allowed_ext) and not name.endswith(exclude_file)):
      file= os.path.join(root, name)
      print("GZIP and Replace... "+file)
      with open(file, 'rb') as f_in:
        ## Use GZIP
        if(compression_type == "gzip"):
          with gzip.open(file+'.gz', 'wb') as f_out:
            shutil.copyfileobj(f_in, f_out)
      os.remove(file)
      os.rename(file+'.gz', file)