@echo off
del build\mosyrejs\*.* /Y

copy src\mosyrejs\*.js build\mosyrejs /Y
copy README.md build /Y
copy package.json build /Y

node .\node_modules\webpack\bin\webpack.js --optimize-minimize