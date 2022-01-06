# copy stage into prod
import os
from concurrent import futures
import boto3
import yaml
import io
import time
import sys
from multiprocessing.pool import ThreadPool as Pool

start = time.time()

legacy_origin = ["-o", "--legacy-origin"]
legacy_destination = ["-d", "--legacy-destination"]

with io.open('../../config.yaml', 'r') as file:
  config = yaml.safe_load(file)

with io.open('../../local.yaml', 'r') as file:
  localConfig = yaml.safe_load(file)

aws_id = localConfig["AWS_ACCESS_KEY_ID"]
aws_secret = localConfig["AWS_SECRET_KEY"]
session = boto3.Session(
  aws_access_key_id=aws_id,
  aws_secret_access_key=aws_secret
)

s3 = session.resource("s3")

old_bucket_name = config["stage"]["bucket"]
old_prefix = config["stage"]["prefix"]

new_bucket_name = config["production"]["bucket"]
new_prefix = config["production"]["prefix"]
case_id = config["production"]["id"]

old_bucket = s3.Bucket(old_bucket_name)

# for obj in old_bucket.objects.filter(Prefix=old_prefix):
#   old_source = {
#     'Bucket': old_bucket_name,
#     'Key': obj.key
#   }
#   print(obj.key)
#   # replace the prefix
#   new_key = obj.key.replace(old_prefix, new_prefix, 1)

#   s3.meta.client.copy(old_source, new_bucket_name, new_key)
#   # new_obj = new_bucket.Object(new_key)
#   # new_obj.copy(old_source)

objects = old_bucket.objects.filter(Prefix=old_prefix)

def copy_object(obj):
  old_source = {
    'Bucket': old_bucket_name,
    'Key': obj.key
  }
  print(obj.key)
  # replace the prefix
  new_key = obj.key.replace(old_prefix, new_prefix, 1)
  s3.meta.client.copy(old_source, new_bucket_name, new_key)

pool = Pool(6)

for obj in objects:
  print(obj)
  pool.apply_async(copy_object, (obj,))

pool.close()
pool.join()
print(time.time() - start)


build_dir_name = str(time.strftime('%Y%m%d%H%M'))
old_bucket_name = bucket
old_prefix = prefix
new_bucket_name = config["stage"]["bucket"]
new_prefix = f"stem_cases/backups/production/{case_id}/{build_dir_name}/"
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

backup_object_collection = new_bucket.objects.filter(Prefix=f"stem_cases/backups/production/{case_id}/")
backup_object_list = []

for obj in backup_object_collection:
    dirs = obj.key.split("/")
    backup_object_list.append(int(dirs[4]))

backup_dir_list = list(dict.fromkeys(backup_object_list))
backup_dir_list.sort()

oldest_build_objects_prefix = f"stem_cases/backups/production/{case_id}/{str(backup_dir_list[0])}"
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