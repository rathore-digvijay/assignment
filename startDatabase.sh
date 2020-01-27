cd 
mkdir eCommDb -p
mongod --storageEngine wiredTiger --dbpath "./eCommDb" --port 28002 &
echo '============   Main database (wiredTiger) started ============'