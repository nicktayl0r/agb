This folder contains shared script files for using PlayCanvas.


=Build Prereqs=
==Windows==
* MSBuild 
  Best Option
          Open PowerShell as Administrator
          $yarn global add windows-build-tools

  Back up Option
            https://docs.microsoft.com/en-us/visualstudio/msbuild/msbuild?view=vs-2019 
 	    install "Individual Components" - [x] MSBuild


= Build =
$yarn install 
$yarn build:all