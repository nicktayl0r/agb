#!/usr/bin/env bash
# cd ~/Projects/Foo/
# python -m SimpleHTTPServer 8080 &> /dev/null &
# open http://localhost:8080/

#make sure node is installed

NODEINSTALLED=$(node -v)
if [[ ($NODEINSTALLED == *"v9"*) || ($NODEINSTALLED == *"v8"*) || ($NODEINSTALLED == *"v12"*) || ($NODEINSTALLED == *"v14"*) ]]; #checking that the version string is "v9" or "v8.9"
then
  echo "Node version: $NODEINSTALLED"
else
    echo $NODEINSTALLED
    echo "Node must be installed to continue."
    osascript -e 'tell app "System Events" to display dialog "NodeJS version 8.9.x must be installed to open your project."'
    open https://nodejs.org/en/download/
    exit 1
fi
#make sure npm is installed
NPMINSTALLED=$(npm -v)
if [[ ($NPMINSTALLED == *"5."*) || ($NPMINSTALLED == *"6."*) ]]; #checking that the version string has a 5. in it
then
    echo "NPM is installed with version: $NPMINSTALLED"
else 
    echo "NPM is not installed! Install with node!"
    osascript -e 'tell app "System Events" to display dialog "NPM must be installed to open your project. Install NodeJS with NPM package."'
    open https://nodejs.org/en/download/
    exit 2
fi

GIT_INSTALLED=$(git --version)
if [[ $GIT_INSTALLED == *"2."* ]]; #checking that the version string has a 2 in it
then
    echo "GIT is installed with version: $NPMINSTALLED"
else 
    echo "GIT is not installed or needs an update, you should do something about that."
    open https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
    exit 2 
fi

#make sure yarn is installed
YARNINSTALLED=$(yarn --version)
if [[ ${YARNINSTALLED:0:1} == *"1"* ]];
then
    echo "yarn is installed with version: $YARNINSTALLED"
else 
    echo "yarn is not installed with v 1.x."
    echo "You will need to install yarn manually. Paste the following into your terminal."
    echo -e "\n sudo npm install -g yarn \n"
    exit 2
fi

#Start the node server, which will do everything else
BASEDIR=$1
echo "project is at: $BASEDIR"
cd local_api

cd dependencies/PlaycanvasEngine
yarn build-all

cd ../app
yarn build-all

cd ../grapes
yarn build:all

cd ..

yarn install
open http://localhost:8000/editor/project
yarn run dev
#do not exit, as this will stop the server
