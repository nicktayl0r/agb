#setup

from __future__ import print_function
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
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials


with io.open('../../config.yaml', 'r') as file:
  env = yaml.safe_load(file)

with io.open('../../local.yaml', 'r') as file:
  localEnv = yaml.safe_load(file)

CASE_ID = env['storyboards']['case']['slideshow_id']
HANDBOOK_ID = env['storyboards']['handbook']['slideshow_id']

google_api_key = localEnv['GOOGLE_API_KEY']

asset_dict = {
  "meta": {
    "initialized": time.time(),
    "updated": None,
    "updates": []
  },
  "assets": [],
}

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/presentations.readonly']

asset_suffixes = ['aPNG', 'IMG', 'MOV', 'SVG', 'ICON', 'JSON', 'AUD']


def main():
    """Shows basic usage of the Slides API.
    Prints the number of slides and elments in a sample presentation.
    """
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('../../token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                '../../credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    service = build('slides', 'v1', credentials=creds)

    # Call the Slides API

    case_presentation = service.presentations().get(presentationId=CASE_ID).execute()
    case_slides = case_presentation.get('slides')

    handbook_presentation = service.presentations().get(presentationId=HANDBOOK_ID).execute()
    handbook_slides = handbook_presentation.get('slides')

    print('The handbook presentation contains {} slides:'.format(len(handbook_slides)))
    print('The case presentation contains {} slides:'.format(len(case_slides)))

    for s in handbook_slides:
      if s.get('pageElements'):
        for p in s['pageElements']:
          # print(p, "\n\n")
          if p.get("shape"):
            if p['shape'].get('text'):
              for t in p["shape"]["text"]["textElements"]:
                is_link = t.get('textRun', {}).get('style', {}).get('link')
                if t.get('textRun', {}).get('content', {}) and  is_link is not None:
                  slide_text = t['textRun']['content']
                  slide_text_list = slide_text.split("_")
                  if slide_text_list[-1] in asset_suffixes:
                    # asset_dict['assets'][slide_text] = {'key': is_link }
                    asset_dict['assets'].append(slide_text)

    for s in case_slides:
      if s.get('pageElements'):
        for p in s['pageElements']:
          # print(p, "\n\n")
          if p.get("shape"):
            if p['shape'].get('text'):
              for t in p["shape"]["text"]["textElements"]:
                is_link = t.get('textRun', {}).get('style', {}).get('link')
                if t.get('textRun', {}).get('content', {}) and  is_link is not None:
                  slide_text = t['textRun']['content']
                  slide_text_list = slide_text.split("_")
                  if slide_text_list[-1] in asset_suffixes:
                    asset_dict['assets'].append(slide_text)

    asset_dict['assets'] =  list(dict.fromkeys(asset_dict['assets']))
    with open("../../asset_manifest.json", "w") as outfile:
      json.dump(asset_dict, outfile, indent=4)



if __name__ == '__main__':
    main()



# loop over google slides data to put into dict


# write dict to json file