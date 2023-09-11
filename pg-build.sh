#!/bin/sh
npm install --production
npx cds build --production
mkdir -p gen/pg/srv
cds compile '*' > gen/pg/srv/csn.json
cp res/package.json gen/pg/package.json
