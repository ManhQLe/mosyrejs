@echo off

del build\*.* /Q
copy src\mosyrejs\*.js build /Y
copy README.md build /Y
copy package.json build /Y

node .\node_modules\webpack\bin\webpack.js --optimize-minimize