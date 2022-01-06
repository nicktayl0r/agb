# uploads sims to content.elstage


import os
from concurrent import futures
import boto3
import yaml
import io
import time
import sys

with io.open('../../config.yaml', 'r') as file:
  config = yaml.safe_load(file)

with io.open('../../local.yaml', 'r') as file:
  localConfig = yaml.safe_load(file)

directory = "../../project/assets/scenes"
bucket = "content.elcloudstage.net"
prefix = "stem_cases/sims/"
case_id = config['production']["id"]


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
  print(prefix + f"{str(case_id)}/" + os.path.relpath(filename, directory))
  s3.upload_file(Filename=filename, Bucket=bucket, Key=prefix + f"{str(case_id)}/" + os.path.relpath(filename, directory))

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