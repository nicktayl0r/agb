
import shutil
import os
import json
import boto3

parent_dir = "../../project/assets/"
IMAGE_PATH = os.path.join(parent_dir, "image")
VIDEO_PATH = os.path.join(parent_dir, "video")
SVG_PATH = os.path.join(parent_dir, "svg")
JSON_PATH = os.path.join(parent_dir, "json")
AUD_PATH = os.path.join(parent_dir, "audio")
OTHER_PATH= os.path.join(parent_dir, "other")

suffix_path_dist = {
  "aPNG": IMAGE_PATH,
  "IMG": IMAGE_PATH,
  "MOV": VIDEO_PATH,
  "SVG": SVG_PATH,
  "ICON": OTHER_PATH,
  "JSON": JSON_PATH
}

# 1. liquidate all

shutil.rmtree('../../project/assets/image', ignore_errors=True)
shutil.rmtree('../../project/assets/video', ignore_errors=True)
shutil.rmtree('../../project/assets/svg', ignore_errors=True)
shutil.rmtree('../../project/assets/json', ignore_errors=True)
shutil.rmtree('../../project/assets/audio', ignore_errors=True)
shutil.rmtree('../../project/assets/other', ignore_errors=True)

#1a. rebuild directory structure
# os.mkdir(os.path.join(".", "../../project/assets"))
os.mkdir(IMAGE_PATH)
os.mkdir(VIDEO_PATH)
os.mkdir(SVG_PATH)
os.mkdir(JSON_PATH)
os.mkdir(AUD_PATH)
os.mkdir(OTHER_PATH)

extension_dict = {
  'webm' : {
    's3': "video",
    "local": "video"
  },
  'mp3': {
    's3': "mp3",
    "local": "audio"
  },
  'mp4': {
    's3': "video",
    "local": "video"
  },
  'png': {
    's3': "img",
    "local": "image"
  },
  'svg': {
    's3': "svg",
    "local": "svg"
  },
  'json': {
    's3': "json",
    "local": "json"
  },
  'jpeg': {
    's3': "img",
    "local": "image"
  },
  'jpg': {
    's3': "img",
    "local": "image"
  }
}


# 2. import asset_manifest, download all
def main():

  # import asset manifest
  with open("../../asset_manifest.json") as json_file:
    asset_manifest = json.load(json_file)

  asset_list = asset_manifest["assets"]
  missing_assets = []
  found_assets = []

  aws_id="AKIAZV22425L7B6ASJ4H"
  aws_secret="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"
  session = boto3.Session(
    aws_access_key_id=aws_id,
    aws_secret_access_key=aws_secret
  )
  s3 = boto3.client("s3",  aws_access_key_id=aws_id, aws_secret_access_key=aws_secret)
  print(len(list(dict.fromkeys(asset_list))))
  for asset_name in asset_list:
    if "." in asset_name:
      extension = asset_name.split(".")[-1]
      s3_path = extension_dict[extension]['s3']
      local_path = extension_dict[extension]['local']
      
      s3_name = f'stem_cases/finals/{s3_path}/{asset_name}'

      try:
        s3.download_file('content.elcloudstage.net', s3_name, f'../../project/assets/{local_path}/{asset_name}')
        found_assets.append(asset_name);
      except:
        missing_assets.append(s3_name)
    
    else:
      suffix = asset_name.split("_")[-1]

      if suffix == "IMG":
        try:
          # s3.download_file('content.elcloudstage.net', f'finals/img/{asset_name}.jpg', f'../../project/assets//image/{asset_name}.jpg')
          # s3.download_file('content.elcloudstage.net', f'finals/img/{asset_name}.jpeg', f'../../project/assets//image/{asset_name}.jpeg')
          s3.download_file('content.elcloudstage.net', f'stem_cases/finals/img/{asset_name}.png', f'../../project/assets/image/{asset_name}.png')
          found_assets.append(asset_name);
        except:
          missing_assets.append(asset_name)
      elif suffix == "aPNG":
        try:
          s3.download_file('content.elcloudstage.net', f'stem_cases/finals/img/{asset_name}.png', f'../../project/assets//image/{asset_name}.png')
          found_assets.append(asset_name);
        except:
          missing_assets.append(asset_name)
        try:
          s3.download_file('content.elcloudstage.net', f'stem_cases/finals/img/{asset_name}.apng', f'../../project/assets//image/{asset_name}.apng')
          found_assets.append(asset_name);
        except:
          missing_assets.append(asset_name)
      elif suffix == "MOV":
        try:
          s3.download_file('content.elcloudstage.net', f'stem_cases/finals/{asset_name}.mp4', f'../../project/assets//video/{asset_name}.mp4')
          found_assets.append(asset_name);
        except:
          missing_assets.append(asset_name)
        try:
          s3.download_file('content.elcloudstage.net', f'stem_cases/finals/{asset_name}.webm', f'../../project/assets//video/{asset_name}.webm')
          found_assets.append(asset_name);
        except:
          missing_assets.append(asset_name)
      elif suffix == "SVG":
        try:
          s3.download_file('content.elcloudstage.net', f'stem_cases/finals/svg/{asset_name}.svg', f'../../project/assets/svg/{asset_name}.svg')
          found_assets.append(asset_name);
        except:
          missing_assets.append(asset_name)
      elif suffix == "ICON":
        try:
          s3.download_file('content.elcloudstage.net', f'stem_cases/finals/img/{asset_name}.png', f'../../project/assets//image/{asset_name}.png')
          found_assets.append(asset_name);
        except:
          missing_assets.append(asset_name)
      elif suffix =="JSON":
        try:
          s3.download_file('content.elcloudstage.net', f'stem_cases/finals/json/{asset_name}.json', f'../../project/assets//json/{asset_name}.json')
          found_assets.append(asset_name);
        except:
          missing_assets.append(asset_name)
      elif suffix =="AUD":
        try:
          s3.download_file('content.elcloudstage.net', f'stem_cases/finals/mp3/{asset_name}.mp3', f'../../project/assets//audio/{asset_name}.mp3')
          s3.download_file('content.elcloudstage.net', f'stem_cases/finals/video/{asset_name}.webm', f'../../project/assets/audio/{asset_name}.webm')
          found_assets.append(asset_name);
        except:
          missing_assets.append(asset_name)
      else:
        print(f"{asset_name} does not have a supported suffix, downloading to other...")
  print(found_assets, len(list(dict.fromkeys(missing_assets))))
    # download apprpriate files using boto3 into apprpriate dir


if __name__ == '__main__':
    main()
