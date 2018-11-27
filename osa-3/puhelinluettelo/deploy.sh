#!/bin/sh
npm run build
rm -rf ../osa-3/build
cp -r build ../osa-3/