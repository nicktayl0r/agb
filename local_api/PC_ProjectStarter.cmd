@ECHO OFF
SETLOCAL ENABLEEXTENSIONS
REM parent is the parent directory
SET parent=%1

set nodeOK=false
set nodeV=""
REM store the results of the "node -v" command in a variable nodeV
for /f "delims=" %%A in ('node -v') do set "nodeV=%%A"
if not x%nodeV:v8.=%==x%nodeV% (
    REM nodeV does contain v8.9
    set nodeOK=true
) else if not x%nodeV:v9.=%==x%nodeV% (
    REM nodeV does contain v9
    set nodeOK=true
) else if not x%nodeV:v10.=%==x%nodeV% (
    REM nodeV does contain v10
    set nodeOK=true
) else if not x%nodeV:v12.=%==x%nodeV% (
    REM nodeV does contain v10
    set nodeOK=true
) else if not x%nodeV:v14.=%==x%nodeV% (
    REM nodeV does contain v14
    set nodeOK=true
) else (
    REM nodeV does NOT contain v8.9, check v9
    if not x%nodeV:v9=%==x%nodeV% set nodeOK=true
)

if "%nodeOK%" == "false" (
    REM nodeV does NOT contain v8.9 or v9, therefore prompt to install node
    echo "Node must be installed to continue."
    msg * /w Node must be installed to continue.
    start "" https://nodejs.org/en/download/
    exit 1
) else (
    echo "Node passed version check. Version installed is: %nodeV%"
)

set npmV=""
set npmOK=false
for /f "delims=" %%A in ('npm -v') do set "npmV=%%A"
if not x%npmV:5=%==x%npmV% (
    REM npmV does contain 5
    echo "npm passed version check. Version installed is: %npmV%"
    set npmOK=true
) else if not x%npmV:6=%==x%npmV% (
    REM npmV does contain 6
    echo "npm passed version check. Version installed is: %npmV%"
    set npmOK=true
) 

if "%npmOK%" == "false" (
    REM nodeV does NOT contain v8.9 or v9, therefore prompt to install node
    echo "Node must be installed to continue."
    msg * /w Node must be installed to continue.
    start "" https://nodejs.org/en/download/
    exit 1
) else (
    echo "Node passed version check. Version installed is: %nodeV%"
)

set gitV=""
FOR /F "tokens=* USEBACKQ" %%F IN (`git --version`) DO (
SET gitV=%%F
echo %%F|find "git version 2" >nul
  if errorlevel 1 (
      gitV does NOT contain 2, install
      echo "git is not installed with a version of 2, You must install a recent version to continue."
      start "" https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
      REM exit 1
  ) else (
      echo "git passed version check. Version installed is: %%F"
  )
)

set yarnV=""
for /f "delims=" %%A in ('yarn --version') do set "yarnV=%%A"
if not x%yarnV:1.3=%==x%yarnV% (
    REM yarnV does contain 1.3
    echo "yarn passed version check. Version installed is: %yarnV%"
) else (
    REM yarnV does NOT contain 1.3, install
    echo "yarn is not installed with a version of 1.3. Installing..."
    call npm install -g yarn
)

REM  remStart the node server, which will do everything else
REM echo "Project is at: %parent%"
call cd %parent%
call cd local_api

call cd dependencies/PlaycanvasEngine
call yarn build-all

call cd ../app
call yarn build-all

call cd ../grapes
call yarn build:all

call cd ..

call yarn install
start "" http://localhost:8000/editor/project
call yarn run dev

echo "Finished project"
