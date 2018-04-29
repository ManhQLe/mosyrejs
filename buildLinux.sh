#!/bin/bash
# Building 

rm build/*.* -rf
cp src/mosyrejs/*.js build -fr
cp README.md build -rf
cp package.json build -rf

node ./node_modules/webpack/bin/webpack.js --optimize-minimize