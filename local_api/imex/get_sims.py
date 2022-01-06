import yaml
import requests
import io
import os
import polling2
import json
import shutil
from urllib.request import urlopen
from io import BytesIO
from zipfile import ZipFile
import time

with io.open('../../config.yaml', 'r') as file:
  env = yaml.safe_load(file)

with io.open('../../local.yaml', 'r') as file:
  localEnv = yaml.safe_load(file)

pc_projects = env['playcanvas']
pc_key = localEnv['PC_TOKEN']

# erase wxisting playcanvas directories
pc_path = "../../assets/scenes"
if os.path.isdir(pc_path):
  shutil.rmtree(pc_path)

for project in pc_projects:
  project_id = project['project_id']
  project_name = project['name']

  project_url = ""
  zip_url = ""
  print("project:\t", project_name)
  # get scenes
  scenes_response = requests.get(f"https://playcanvas.com/api/projects/{project_id}/scenes",
    headers={
      'Authorization': f"Bearer {pc_key}",
    }
  )

  scenes_response_json = scenes_response.json()
  scenes_list = [ scene['id'] for scene in scenes_response_json['result'] ]
  print("scenes:\t\t", scenes_list)

  post_data= json.dumps({
    "project_id": int(project_id),
    "name": project_name,
    "scenes": scenes_list
  })

  # download app
  response = requests.post(f"https://playcanvas.com/api/apps/download",
    headers={
      'Authorization': f"Bearer {pc_key}",
      'Content-Type': 'application/json'
    },
    data=post_data
    )
  response_dict = response.json()
  job_id = response_dict['id']

  def is_complete(job):
    return job['status'] == "complete" or job['status'] == 'error'

  def awaitProject():
    print('polling...')
    job_response = requests.get(f"https://playcanvas.com/api/jobs/{job_id}", headers={
    'Authorization': f"Bearer {pc_key}"})

    return job_response.json()

  job = polling2.poll(
    awaitProject,
    check_success=is_complete,
    step=10,
    poll_forever=True
  )

  project_url = f"../../project/assets/sc/{project_id}"
  zip_url = job['data']['download_url']
  # make new dir
  if not os.path.isdir(project_url):
   os.makedirs(project_url)

  def download_and_unzip(url, extract_to):
    print("downloading app...")
    start = time.time()
    http_response = urlopen(url)
    zipfile = ZipFile(BytesIO(http_response.read()))
    print("unzipping...")
    zipfile.extractall(path=project_url)
    finish = time.time()
    print('elapsed:\t', str(int(finish - start)), " second(s)")
  
  download_and_unzip(zip_url, project_url + "/scene.zip")
  