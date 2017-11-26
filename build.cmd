@echo off

copy src\mar3 build /Y
copy README.md build /Y
copy package.json build /Y

webpack --optimize-minimize