@echo off

copy src\mar3\*.js build\mar3 /Y
copy README.md build /Y
copy package.json build /Y

node .\node_modules\webpack\bin\webpack.js --optimize-minimize