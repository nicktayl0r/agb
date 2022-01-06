# deploys to dev or stage

import os
from concurrent import futures
import boto3
import yaml
import io
import time
import sys

#TODO on ic-primary release, rotate release_builds

# setup variables
MAX_BUILDS=3

# TODO implement flags
asset_ignore_flags = ["-i", "--ignore-assets"] # won't upload assets directory
asset_revise_flags = ["-r", "--revise-assets"] # will delete all assets in s3 first
custom_bucket_flags = ["-b", "--custom_bucket"] # will upload wherever you want

arguments = sys.argv[1:]
target_env = arguments[0]

accepted_envs = [
  "production",
  "stage",
  "dev",
  "legacy-stage",
  "legacy-prod"
]

if target_env not in accepted_envs:
  print(accepted_envs)
  raise ValueError(f"{target_env} is not in the accepted list of environments! Refer to the config.yaml file.")

with io.open('../../config.yaml', 'r') as file:
  config = yaml.safe_load(file)

with io.open('../../local.yaml', 'r') as file:
  localConfig = yaml.safe_load(file)

directory = "../../publish"
bucket = config[target_env]["bucket"]
prefix = config[target_env]["prefix"]
case_id = config[target_env]["id"]
aws_id = localConfig["AWS_ACCESS_KEY_ID"]
aws_secret = localConfig["AWS_SECRET_KEY"]
session = boto3.Session(
  aws_access_key_id=aws_id,
  aws_secret_access_key=aws_secret
)
s3 = session.client("s3")
start = time.time()

# concurrently upload to s3
def error(e):
    raise e

def walk_directory(directory):
    for root, _, files in os.walk(directory, onerror=error):
        for f in files:
            yield os.path.join(root, f)

def upload_file(filename):
  print(prefix + "/" + os.path.relpath(filename, directory))
  s3.upload_file(Filename=filename, Bucket=bucket, Key=prefix + os.path.relpath(filename, directory))

with futures.ThreadPoolExecutor() as executor:
    upload_task = {}

    for filename in walk_directory(directory):
        upload_task[executor.submit(upload_file, filename)] = filename

    for task in futures.as_completed(upload_task):
        try:
            task.result()
        except Exception as e:
            print("Exception {} encountered while uploading file {}".format(e, upload_task[task]))

finish = time.time()

print('elapsed:\t', str(int(finish - start)), " second(s)")

# back up this build
if target_env in ["stage", "production", "legacy-stage", "legacy-prod"]:
  build_dir_name = str(time.strftime('%Y%m%d%H%M'))
  old_bucket_name = bucket
  old_prefix = prefix
  new_bucket_name = config["stage"]["bucket"]
  new_prefix = f"stem_cases/backups/{target_env}/{case_id}/{build_dir_name}/"
  s3 = boto3.resource('s3')
  old_bucket = s3.Bucket(old_bucket_name)
  new_bucket = s3.Bucket(new_bucket_name)
  print("handle backups...")

  for obj in old_bucket.objects.filter(Prefix=old_prefix):
    print(obj.key)
    old_source = { 'Bucket': old_bucket_name,
                   'Key': obj.key}
    # replace the prefix
    new_key = obj.key.replace(old_prefix, new_prefix, 1)
    new_obj = new_bucket.Object(new_key)
    new_obj.copy(old_source)

  backup_object_collection = new_bucket.objects.filter(Prefix=f"stem_cases/backups/{target_env}/{case_id}/")
  backup_object_list = []

  for obj in backup_object_collection:
     dirs = obj.key.split("/")
     backup_object_list.append(int(dirs[4]))

  backup_dir_list = list(dict.fromkeys(backup_object_list))
  backup_dir_list.sort()

  oldest_build_objects_prefix = f"stem_cases/backups/{target_env}/{case_id}/{str(backup_dir_list[0])}"
  print("prefix: ", oldest_build_objects_prefix)
  

  # delete oldest backup
  if len(backup_dir_list) > MAX_BUILDS:
    print("pruning oldest...")
    object_deletion_collection = new_bucket.objects.filter(Prefix=oldest_build_objects_prefix)
    object_deletion_list = []
    for o in object_deletion_collection:
      object_deletion_list.append({
        'Key': o.key
      })

    new_bucket.delete_objects(
      Delete={
        'Objects': object_deletion_list
      }
    )
    