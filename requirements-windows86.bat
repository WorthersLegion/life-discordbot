@echo off

if not exist "%HOMEDRIVE%\Program Files\nodejs\npm.bat" (
    echo # Downloading Node.js 9
    bitsadmin /transfer nodejs9 /download /priority normal https://nodejs.org/dist/v9.8.0/node-v9.8.0-x86.msi %HOMEDRIVE%%HOMEPATH%\Downloads\node-v9.8.0-x86.msi

    echo # Installing Node.js 9
    %HOMEDRIVE%%HOMEPATH%\Downloads\node-v9.8.0-x86.msi /quiet /norestart
) else (
    echo # Oh you already have node.js? Well let's skip all that stuff and install the bot dependencies!
)

if exist "%HOMEDRIVE%\Program Files (x86)" (
    echo # Installing eris module via npm
    "%HOMEDRIVE%\Program Files (x86)\nodejs\npm.bat" install eris

    echo # Installing mysql module via npm
    "%HOMEDRIVE%\Program Files (x86)\nodejs\npm.bat" install mysql

    echo # Installing async module via npm
    "%HOMEDRIVE%\Program Files (x86)\nodejs\npm.bat" install async
) else (
    echo # Installing eris module via npm
    "%HOMEDRIVE%\Program Files\nodejs\npm.bat" install eris

    echo # Installing mysql module via npm
    "%HOMEDRIVE%\Program Files\nodejs\npm.bat" install mysql

    echo # Installing async module via npm
    "%HOMEDRIVE%\Program Files\nodejs\npm.bat" install async
)
