# start reverse proxy
traefik --configFile=./traefik.yaml &

# start the api
python ./api/main.py &

# start the frontend web server
cd web
if [ "$DEV" == 1 ]; then
    npm run dev &
else
    npm run start &
fi

# sleep forever
sleep infinity
