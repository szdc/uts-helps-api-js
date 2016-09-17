# UTS HELPS JavaScript API

## Installation
`npm i --save ssh://git@github.com:szdc/uts-helps-api-js.git`

## Making changes
This repository maintains two branches: **master** (development) and **transpiled** (the transpiled API file(s); no tests).

1. Fetch the latest changes: `git fetch origin`
1. Make sure you are on branch **master**: `git checkout master`
1. Run `npm run build` and `npm run build_test` to watch your files and have them transpiled as you go.
1. Make your changes in the **src/** folder
1. Write tests (**src-test/**) to confirm your API wrappers work as expected
1. Commit and push your changes
1. Switch to branch **transpiled**: `git checkout transpiled`
1. Pull in your changes from master: `git pull origin master`
1. Run `npm run build` to compile the latest changes
1. Commit and push your changes: `git push origin transpiled`

## Updating Scoreboard front-end
Scoreboard front-end is configured to pull changes from the **transpiled** branch of this repository.
To update the front-end repository, run `npm update utshelps-api-js` from within the Scoreboard Front-End repository (not this repo).