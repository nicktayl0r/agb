import os
import json

def getCompression_Type(path='../local_api/config/postBuildConfig.json'): 
  compression_type = 'gzip'

  try:
    json_file= open(path)
    data= json.load(json_file)
    try: 
      compression_type = data['compression']['type']
    except:
      print("../config/postBuildConfig.JSON - No `type` found." )
  except:
    print("../config/postBuildConfig.JSON - error reading file" )
  return compression_type



  
def getCompression_AllowedExtTuple(path='../local_api/config/postBuildConfig.json'):   
  allowed_ext_tuple = ('.txt','.json','.css','.html','.js', '.js.map','.svg', '.dds','.ktx')

  try:
    json_file= open(path)
    data= json.load(json_file)
    try: 
      allowed_ext_tuple = tuple(data['compression']['allowed_ext'])
    except:
      print("../config/postBuildConfig.JSON - No `allowed_ext` found." )
  except:
    print("../config/postBuildConfig.JSON - error reading file" )
  return allowed_ext_tuple



  
  
def getCompression_ExcludeFileTuple(path='../local_api/config/postBuildConfig.json'):   
  exclude_file_tuple = ('player-version.txt', 'project-version.txt')

  try:
    json_file= open(path)
    data= json.load(json_file)
    try: 
      exclude_file_tuple = tuple(data['compression']['exclude_file'])
    except:
      print("../config/postBuildConfig.JSON - No `exclude_file` found." )
  except:
    print("../config/postBuildConfig.JSON - error reading file" )
  return exclude_file_tuple