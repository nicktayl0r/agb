#This script requires On MAC python2.7 or newer     or   Windows python 3.4 or newer
#  s3cmd must be configured
#       python postBuildS3.py --configure
#         Requires Valid Access Key              https://console.aws.amazon.com/iam/home?region=us-east-1#/security_credentials
#         Requires Valid Secret Key              https://console.aws.amazon.com/iam/home?region=us-east-1#/security_credentials
#       Other settings:
#         Default Region: US
#         S3 Endpoint: s3.amazonaws.com
#         DNS-style bucket+hostname:port template for accessing a bucket: %(bucket)s.s3.amazonaws.com
#         Encryption password: <your clg password>
#         Path to GPG program: None
#         Use HTTPS protocol: True
#         HTTP Proxy server name: 
#         HTTP Proxy server port: 0

import sys, getopt
import os
import shutil
import json
import subprocess
import platform

#Get Configuration

sys.path.append( os.path.join(os.path.dirname(os.path.realpath(__file__)), 'helpers'))
from postBuildConfigJSON_Reader import getCompression_Type, getCompression_AllowedExtTuple, getCompression_ExcludeFileTuple

compression_type = getCompression_Type('../local_api/config/postBuildConfig.json')
allowed_ext = getCompression_AllowedExtTuple('../local_api/config/postBuildConfig.json')
exclude_file = getCompression_ExcludeFileTuple('../local_api/config/postBuildConfig.json')

s3BucketURL_Template= "s3://{0}/resources/cases/versions/{1}/"
s3cmd = str("\""+os.path.join(os.path.dirname(os.path.realpath(__file__)), 'dependencies','s3cmd')+ "\"")

#END - Get Configuration

def s3_configure():
  cmd= ["python", s3cmd, "--configure" ]
  print (cmd)
  os.system(" ".join(cmd))


def s3_deploy(s3bucket, s3folder, addHeader_ContentEncoding, publishDir):
  print ("s3_deploy {0} {1} {2} {3}".format(s3bucket, s3folder, addHeader_ContentEncoding, publishDir ))

  if(os.path.isdir(publishDir)):
    publishDir= os.path.join(os.path.abspath(publishDir), ".")
    #bash or file i/o commands here  
  
    cmd= ["python", s3cmd , "sync", "--recursive", "--no-mime-magic","--guess-mime-type", publishDir, s3BucketURL_Template.format(s3bucket, s3folder) ]


    print (cmd)
    os.system(" ".join(cmd))
  else:
    print ("Error publishDir {0} is not a directory or cannot be found.".format(publishDir))

def s3_setEncoding(s3bucket, s3folder, addHeader_ContentEncoding, publishDir):
  print ("s3_setEncoding {0} {1} {2} {3}".format(s3bucket, s3folder, addHeader_ContentEncoding, publishDir ))
  #bash or file i/o commands here
#   s3cmd --modify \
#         --add-header="Cache-Control:max-age=86400"    \
#         --add-header='Content-Encoding:gzip'                  \
#         s3://yourbucket/path/to/your/folder/file
  
  #cmd = ["s3cmd", "modify", "--add-header=\"Cache-Control:max-age=86400\"", "--add-header=\"Content-Encoding:{0}\"".format(compression_type)]
  cmd= ["python", s3cmd,  "modify",  "--add-header=\"Content-Encoding:{0}\"".format(compression_type), ""]
  
  if(os.path.isdir(publishDir)):
    os.chdir(publishDir)
    dir_path = os.getcwd()
    print (dir_path)

    bucketPath= s3BucketURL_Template.format(s3bucket, s3folder)
    file=''
    filePath= []
    for root, dirs, files in os.walk("."):
      for name in files:
        if(name.endswith(addHeader_ContentEncoding) and not name.endswith(exclude_file)):
          file= os.path.join(root, name)
          filePath= [ "\"" + bucketPath + os.path.join(root, name)[2:].replace("\\","/") + "\""]
          #print (" ".join(cmd + filePath ))
          os.system(" ".join(cmd + filePath))
        #else:
         # print ("exclude " + name)
  else:
      print ("Error publishDir {0} is not a directory or cannot be found.".format(publishDir))


def s3_verify(s3bucket, s3folder, publishDir):
  print ("s3_verify {0} {1} {2}".format(s3bucket, s3folder, publishDir ))
  cmd= ["python", s3cmd,  "info", "--debug", s3BucketURL_Template.format(s3bucket, s3folder)+"index.html"]
  #print(" ".join(cmd))
  os.system(" ".join(cmd))


def main(argv):
  print ("Checking params...")
  s3bucket= 'el-gizmos-stage'
  s3folder= ''

  configure= False
  deploy= False
  verify= False
  publishDir= ''

  setEncoding= False
  addHeader_ContentEncoding= ""

  try:
    opts, args = getopt.getopt(argv,"dhcs:f:p:",["configure", "s3bucket=", "s3folder=", "publishDir=", "deploy", "verify", "addHeader-ContentEncoding", "defaultHeader-ContentEncoding", "help"])
  except getopt.GetoptError:
    print ('postBuildS3.py --configure' )
    print ('postBuildS3.py --deploy --s3bucket <bucket name> --s3folder <s3folder_name> --publishDir <project_repo/publish>' )
    print ('postBuildS3.py --help for Help')
    sys.exit(2)

  for opt, arg in opts:
    if opt in ("-h", "--help"):
      print ('First Time:  \tpostBuildS3.py --configure' )
      print ("To Deploy: \tpostBuildS3.py --deploy --s3bucket <bucket name> --s3folder <s3folder_name> --publishDir <./publish directory> ")
      print ("Set Encoding: \tpostBuildS3.py --defaultHeader-ContentEncoding --s3bucket <bucket name> --s3folder <s3folder_name> --publishDir <./publish directory>")
      print ("\nParameters:")
      print ("\t\t --s3bucket <bucket name>    Default: el-gizmos-stage")
      print ("Required\t --s3folder <s3bucket://s3bucket/resources/case/**s3folder_name**>    ")
      print ("Required\t --publishDir <project_repo/publisH directory>    ")
      print ("\t\t --addHeader-ContentEncoding <csv>    ")
      print ("\t\t --defaultHeader-ContentEncoding  .txt,.json,.css,.html,.js,.js.map,.svg,.dds,.ktx")
      print ("To Verify: \tpostBuildS3.py --verify --s3bucket <bucket name> --s3folder <s3folder_name> --publishDir <./publish directory>")
      sys.exit()
    elif opt in ("-f", "--s3folder"):
      s3folder = arg
    elif opt in ("-s", "--s3bucket"):
      s3bucket = arg
    elif opt in ("-c", "--configure"):
      configure= True
    elif opt in ("-d", "--deploy"):
      deploy= True
    elif opt in ("-V", "--verify" ):
      verify= True
    elif opt in ("-p", "--publishDir"):
      publishDir = arg
    elif opt in ("--addHeader-ContentEncoding"):
      setEncoding= True
      addHeader_ContentEncoding= tuple(arg.split(','))
    elif opt in ("--defaultHeader-ContentEncoding"):
      setEncoding= True
      addHeader_ContentEncoding= allowed_ext



  if not configure and publishDir is "":
    print ('postBuildS3.py must specify --publishDir. This is the path to the Project_Repo/publish directory with a valid build-prod in it')
    print ('\nRun postBuildS3.py --help for examples and options.')
    sys.exit()

  if not configure and s3folder is "":    
    print ('postBuildS3.py must specify --s3folder')
    print ('\nRun postBuildS3.py --help for examples and options.')
    sys.exit()

  if configure:
    s3_configure()
    sys.exit()

  if deploy:
    print ('postBuildS3.py deploy')
    s3_deploy(s3bucket, s3folder, addHeader_ContentEncoding, publishDir)

  if setEncoding:
    print ('postBuildS3.py setEncoding')
    s3_setEncoding(s3bucket, s3folder, addHeader_ContentEncoding, publishDir)

  if verify:
    print('postBuildS3.py verify')
    s3_verify(s3bucket, s3folder, publishDir)

if __name__ == "__main__":
  main(sys.argv[1:])
